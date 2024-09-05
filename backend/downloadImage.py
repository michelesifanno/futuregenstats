import os
import requests
import numpy as np
import cv2
from io import BytesIO
from PIL import Image, ImageEnhance
from supabase import create_client, Client
from concurrent.futures import ThreadPoolExecutor

# Configura Supabase
SUPABASE_URL = 'https://kvrzbmvyyitdzuflqlsq.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cnpibXZ5eWl0ZHp1ZmxxbHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4MTIzMTYsImV4cCI6MjAzODM4ODMxNn0.RzxPzOlhZc3rWtKeWtX7HXY9cnvYcLzWjCu1SSYwTk4'  # Modifica con la tua chiave reale
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Funzione per scaricare l'immagine
def download_image(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Verifica se ci sono errori nella risposta
        return Image.open(BytesIO(response.content)).convert("RGBA")
    except Exception as e:
        print(f"Failed to download image from {url}: {e}")
        return None

# Funzione per migliorare la qualità dell'immagine
def enhance_image(image, sharpness_factor=2.0, color_factor=1.2):
    # Migliora la nitidezza
    enhancer = ImageEnhance.Sharpness(image)
    image = enhancer.enhance(sharpness_factor)
    
    # Migliora il colore
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(color_factor)
    
    return image

# Funzione per applicare un filtro per diversificare l'aspetto delle immagini

# Funzione per processare una singola immagine
def process_image(record):
    image_url = record['competitionimage']
    competition_id = record['id']
    
    # Scarica l'immagine
    image = download_image(image_url)
    if image:
        
        # Migliora la qualità
        enhanced_image = enhance_image(image, sharpness_factor=2.0, color_factor=1.2)
        
        # Crea il percorso di salvataggio
        save_path = f"public/competitions/{competition_id}.png"
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        # Salva l'immagine modificata
        enhanced_image.save(save_path, "PNG", quality=100)  # Salva come PNG per preservare la trasparenza
        print(f"Image saved to {save_path}")

# Funzione principale
def process_images():
    # Estrae i dati dalla tabella players
    data = supabase.table('competitions').select('id', 'competitionimage').execute()
    
    # Utilizza ThreadPoolExecutor per elaborare le immagini in parallelo
    with ThreadPoolExecutor(max_workers=4) as executor:
        executor.map(process_image, data.data)

# Esegui la funzione principale
process_images()