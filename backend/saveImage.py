import os
import requests
import re
import json

# Configurazione Supabase
supabase_url = "https://kvrzbmvyyitdzuflqlsq.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cnpibXZ5eWl0ZHp1ZmxxbHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4MTIzMTYsImV4cCI6MjAzODM4ODMxNn0.RzxPzOlhZc3rWtKeWtX7HXY9cnvYcLzWjCu1SSYwTk4"
table_name = "clubs"

# Headers per l'autenticazione con l'API di Supabase
headers = {
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}",
    "Content-Type": "application/json"
}

# Funzione per convertire i nomi dei file
def format_filename(name):
    # Sostituisci spazi con trattini e rimuovi caratteri non validi per i nomi dei file
    return re.sub(r'[<>:"/\\|?*]', '', name.lower().replace(' ', '-'))

# Verifica se il file esiste già
def file_exists(filepath):
    return os.path.isfile(filepath)

# Funzione per salvare gli errori
def log_error(error_message):
    with open('errors.json', 'a') as error_file:
        json.dump({"error": error_message}, error_file)
        error_file.write("\n")

# Richiesta per ottenere i dati dalla tabella "clubs"
response = requests.get(f"{supabase_url}/rest/v1/{table_name}", headers=headers)

if response.status_code == 200:
    clubs = response.json()

    # Percorso base dove salvare le immagini
    base_dir = 'public'

    # Scarica e salva ogni immagine
    for club in clubs:
        club_name = club.get("name")
        image_url = club.get("image")
        competition_id = club.get("competition_id")

        if image_url and club_name and competition_id:
            # Crea il percorso della directory per la competizione
            competition_dir = os.path.join(base_dir, competition_id)
            os.makedirs(competition_dir, exist_ok=True)

            # Formatta il nome del file per il club
            club_filename = f"{format_filename(club_name)}.png"
            club_filepath = os.path.join(competition_dir, club_filename)

            # Verifica se il file esiste già
            if file_exists(club_filepath):
                print(f"File già esistente per {club_name}: {club_filepath}")
                continue

            # Scarica e salva l'immagine
            try:
                image_response = requests.get(image_url)
                image_response.raise_for_status()  # Verifica che il download sia avvenuto con successo
                with open(club_filepath, 'wb') as f:
                    f.write(image_response.content)
                print(f"Immagine salvata per {club_name} in {club_filepath}")
            except requests.exceptions.RequestException as e:
                error_message = f"Errore nel download dell'immagine per {club_name}: {e}"
                print(error_message)
                log_error(error_message)
            except IOError as e:
                error_message = f"Errore nel salvataggio dell'immagine per {club_name}: {e}"
                print(error_message)
                log_error(error_message)
else:
    print(f"Errore nella richiesta a Supabase: {response.status_code} - {response.text}")
