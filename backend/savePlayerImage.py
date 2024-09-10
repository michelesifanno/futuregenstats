import os
import requests
import json

# Configurazione Supabase
supabase_url = "https://kvrzbmvyyitdzuflqlsq.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cnpibXZ5eWl0ZHp1ZmxxbHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4MTIzMTYsImV4cCI6MjAzODM4ODMxNn0.RzxPzOlhZc3rWtKeWtX7HXY9cnvYcLzWjCu1SSYwTk4"
table_name = "players"

# Headers per l'autenticazione con l'API di Supabase
headers = {
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}",
    "Content-Type": "application/json"
}

# Funzione per verificare se il file esiste già
def file_exists(filepath):
    return os.path.isfile(filepath)

# Funzione per salvare gli errori
def log_error(error_message):
    with open('errors.json', 'a') as error_file:
        json.dump({"error": error_message}, error_file)
        error_file.write("\n")

# Funzione per ottenere tutti i giocatori con la paginazione
def get_all_players():
    players = []
    limit = 1000  # Numero di record per richiesta
    offset = 0  # Offset iniziale

    while True:
        # Richiesta per ottenere i dati dalla tabella "players" con paginazione
        response = requests.get(
            f"{supabase_url}/rest/v1/{table_name}?select=*&limit={limit}&offset={offset}",
            headers=headers
        )

        if response.status_code == 200:
            data = response.json()
            if not data:  # Se non ci sono più dati, termina il ciclo
                break
            players.extend(data)  # Aggiungi i nuovi giocatori alla lista
            offset += limit  # Incrementa l'offset per la prossima richiesta
        else:
            error_message = f"Errore nella richiesta a Supabase: {response.status_code} - {response.text}"
            print(error_message)
            log_error(error_message)
            break

    return players

# Funzione per scaricare e salvare le immagini dei giocatori
def download_images_for_players(players):
    # Percorso base dove salvare le immagini
    base_dir = 'public'

    for player in players:
        new_id = player.get("new_id")
        image_url = player.get("image")

        if image_url and new_id:
            # Crea il percorso della directory per il giocatore
            player_dir = os.path.join(base_dir, new_id)
            os.makedirs(player_dir, exist_ok=True)

            # Formatta il nome del file per il giocatore
            player_filename = f"{new_id}.png"
            player_filepath = os.path.join(player_dir, player_filename)

            # Verifica se il file esiste già
            if file_exists(player_filepath):
                print(f"File già esistente per {new_id}: {player_filepath}")
                continue

            # Scarica e salva l'immagine
            try:
                image_response = requests.get(image_url)
                image_response.raise_for_status()  # Verifica che il download sia avvenuto con successo
                with open(player_filepath, 'wb') as f:
                    f.write(image_response.content)
                print(f"Immagine salvata per {new_id} in {player_filepath}")
            except requests.exceptions.RequestException as e:
                error_message = f"Errore nel download dell'immagine per {new_id}: {e}"
                print(error_message)
                log_error(error_message)
            except IOError as e:
                error_message = f"Errore nel salvataggio dell'immagine per {new_id}: {e}"
                print(error_message)
                log_error(error_message)

# Recupera tutti i giocatori
players = get_all_players()

# Scarica le immagini per i giocatori
download_images_for_players(players)
