import pandas as pd

# Carica i dati dai file Excel
players = pd.read_excel('players.xlsx')
players_performance = pd.read_excel('players_performance_combined.xlsx')

# Uniamo i due dataset basati sull'id del giocatore
merged_data = pd.merge(players, players_performance, left_on='id', right_on='player_id')

# Selezioniamo le colonne che vogliamo sommare e raggruppiamo per player_id
stats_columns = [
    'own_goals', 'yellow_cards', 'yellow_red_cards', 'red_cards', 
    'minutes_played', 'penalty_goals', 'minutes_per_goal', 
    'matches', 'goals', 'assists', 'to_nil', 'conceded_goals'
]

# Raggruppiamo per player_id e sommiamo le statistiche
grouped_data = merged_data.groupby('player_id')[stats_columns].sum().reset_index()

# Aggiungiamo le altre informazioni rilevanti (ad esempio il nome del giocatore)
final_data = pd.merge(grouped_data, players[['id', 'name', 'new_id']], left_on='player_id', right_on='id')

# Ordiniamo il risultato per visualizzare i dati
final_data = final_data[['player_id', 'name', 'new_id'] + stats_columns]

# Salviamo il risultato su un nuovo file Excel o CSV
final_data.to_csv('players_performance_summarized.csv', index=False)
