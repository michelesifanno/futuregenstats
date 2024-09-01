import pandas as pd

# Carica i dati dai file Excel
players = pd.read_excel('players.xlsx')
players_performance = pd.read_excel('players_performance_combined.xlsx')

# Uniamo i due dataset basati sull'id del giocatore
merged_data = pd.merge(players, players_performance, left_on='id', right_on='player_id')

# Definiamo una funzione per calcolare il punteggio del talento
def calculate_talent_score(row):
    # Pesi per i diversi fattori
    weight_goals = 5
    weight_assists = 4
    weight_minutes_played = 2
    weight_cards = -1  # Cartellini diminuiscono il punteggio
    weight_to_nil = 5
    weight_conceded_goals = -1
    weight_market_value = 0.001  # Il valore di mercato è normalmente molto alto, quindi un peso minore

    # Calcoliamo il punteggio
    score = (row['goals'] * weight_goals +
             row['assists'] * weight_assists +
             row['minutes_played'] * weight_minutes_played +
             row['yellow_cards'] * weight_cards +
             row['red_cards'] * weight_cards * 2 +  # Penalizziamo più severamente i cartellini rossi
             row['to_nil'] * weight_to_nil +
             row['conceded_goals'] * weight_conceded_goals +
             row['marketvalue'] * weight_market_value)


    # Aggiusta il punteggio per l'età (giocatori più giovani con buone performance sono più promettenti)
    if row['age'] == 21:
        score *= 1.0  # Nessun aumento per i giocatori di 21 anni
    elif row['age'] == 20:
        score *= 1.1  # Aumenta il punteggio del 10% per i giocatori di 20 anni
    elif row['age'] == 19:
        score *= 1.2  # Aumenta il punteggio del 20% per i giocatori di 19 anni
    elif row['age'] == 18:
        score *= 1.3  # Aumenta il punteggio del 30% per i giocatori di 18 anni
    elif row['age'] < 18:
        score *= 1.4  # Aumenta il punteggio del 40% per i giocatori più giovani di 18 anni

    return score  # Assicurati che questo return sia all'interno della funzione calculate_talent_score



# Applica la funzione a ogni giocatore
merged_data['talent_score'] = merged_data.apply(calculate_talent_score, axis=1)


# Raggruppiamo per 'player_id' per sommare i punteggi di talento e contare le occorrenze
grouped_scores = merged_data.groupby('player_id').agg({
    'talent_score': 'sum',  # Sommiamo i punteggi di talento per ogni giocatore
    'player_id': 'count'    # Contiamo il numero di occorrenze di ogni giocatore (lo chiamiamo 'count')
}).rename(columns={'player_id': 'count'})

# Calcoliamo la media dei punteggi di talento
grouped_scores['average_talent_score'] = grouped_scores['talent_score'] / grouped_scores['count']

# Otteniamo i valori minimo e massimo del punteggio medio
min_score = grouped_scores['average_talent_score'].min()
max_score = grouped_scores['average_talent_score'].max()

# Definiamo il nuovo intervallo desiderato (ad esempio da 20 a 150)
new_max = 150
new_min = 20

# Applichiamo la normalizzazione
grouped_scores['normalized_talent_score'] = ((grouped_scores['average_talent_score'] - min_score) / (max_score - min_score)) * (new_max - new_min) + new_min

# Rimuoviamo i decimali e trasformiamo i punteggi in valori interi
grouped_scores['normalized_talent_score'] = grouped_scores['normalized_talent_score'].round().astype(int)

# Classificazione in base al punteggio normalizzato
def classify_player(score):
    if score >= 100:
        return "ELITE"
    elif score >= 80:
        return "TOP"
    elif score >= 60:
        return "TALENTED"
    elif score >= 40:
        return "EXPERIENCED"
    elif score >= 20:
        return "ASPIRING"
    elif score >= 1:
        return "NOVICE"  # Giocatori con punteggi molto bassi che hanno bisogno di migliorare significativamente
    else:
        return "UNTESTED"  # Giocatori senza dati o con punteggio pari a 0


grouped_scores['classification'] = grouped_scores['normalized_talent_score'].apply(classify_player)

# Previsione della tendenza del punteggio
def predict_trend(recent_score, previous_score):
    increase_threshold = 1.02  # Aumento del 3%
    decrease_threshold = 0.97  # Diminuzione del 5%

    if recent_score > previous_score * increase_threshold:
        return "On the Rise"
    elif recent_score < previous_score * decrease_threshold:
        return "Declining"
    else:
        return "Steady"


# Raggruppiamo i dati per 'player_id' e 'season' per calcolare il punteggio medio per stagione
seasonal_scores = merged_data.groupby(['player_id', 'season']).agg({
    'talent_score': 'mean'  # Media dei punteggi per stagione
}).reset_index()

# Calcoliamo la tendenza del punteggio per ogni giocatore
seasonal_scores['trend'] = seasonal_scores.groupby('player_id')['talent_score'].transform(
    lambda x: predict_trend(x.iloc[-1], x.iloc[-2]) if len(x) > 1 else "N/A"
)

# Otteniamo l'ultima tendenza per ogni giocatore
latest_trends = seasonal_scores.groupby('player_id')['trend'].last().reset_index()

# Uniamo la tendenza con il dataset finale
final_data = pd.merge(grouped_scores, latest_trends, on='player_id')

# Uniamo di nuovo i dati con il dataset originale per ottenere i nomi e altre informazioni sui giocatori
final_data = pd.merge(final_data, players[['id', 'name', 'club_id', 'new_id']], left_on='player_id', right_on='id')

# Visualizziamo i primi 10 giocatori con il punteggio di talento normalizzato più alto e altre informazioni
print(final_data[['player_id', 'name', 'normalized_talent_score', 'classification', 'trend', 'new_id']].head(10))

# Esportiamo i risultati in un file Excel
final_data.to_csv('player_classification_and_trends.csv', index=False)