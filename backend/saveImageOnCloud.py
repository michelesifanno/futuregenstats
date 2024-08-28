import os
import cloudinary
import cloudinary.uploader

# Configura Cloudinary con le tue credenziali
cloudinary.config(
    cloud_name='dfe8fzdna',
    api_key='383622645494562',
    api_secret='iEG3ecZC7vJTEvsLPiuhSbEYNvc'
)

# Percorso della cartella con le immagini
folder_path = '/Users/michelesifanno/Documents/REACT-PROJECTS/Future-Gen-Stats/public/competitions'

def upload_images(folder_path):
    # Verifica che la cartella esista
    if not os.path.exists(folder_path):
        print(f"Il percorso della cartella '{folder_path}' non esiste.")
        return

    # Itera su tutti i file e le sottocartelle nella cartella
    for root, dirs, files in os.walk(folder_path):
        for filename in files:
            file_path = os.path.join(root, filename)
            
            # Verifica se è un file immagine
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                # Crea un percorso relativo rispetto alla cartella principale
                relative_path = os.path.relpath(file_path, folder_path)
                
                # Usa il percorso relativo (sostituendo '\\' con '/') come parte del public_id
                public_id = relative_path.replace(os.path.sep, '/').replace('.png', '').replace('.jpg', '').replace('.jpeg', '').replace('.gif', '')
                
                print(f"Caricando {filename}...")
                try:
                    # Carica l'immagine su Cloudinary con il public_id specificato
                    response = cloudinary.uploader.upload(file_path, public_id=public_id)
                    print(f"Caricata {filename} con ID {public_id}: {response['secure_url']}")
                except Exception as e:
                    print(f"Errore nel caricamento di {filename}: {e}")

# Carica tutte le immagini nella cartella e nelle sue sottocartelle
upload_images(folder_path)
