from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from supabase import create_client, Client
import concurrent.futures
import time

# Configurazione di Selenium
BASE_URL = 'https://native-stats.org/person/'
CHROMEDRIVER_PATH = '/usr/local/bin/chromedriver'

# Configurazione di Supabase
SUPABASE_URL = 'https://xgunomfkrherwuuwucdl.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndW5vbWZrcmhlcnd1dXd1Y2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2OTgwNzgsImV4cCI6MjAzODI3NDA3OH0.va3r4gZQgWCG-3jyO5LJZgCVN3B61Ot4rHaqd5fFW0M'

# Inizializza il client di Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def fetch_player_data(player_id):
    url = f"{BASE_URL}{player_id}"
    options = Options()
    options.headless = True
    service = Service(CHROMEDRIVER_PATH)
    
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url)
    
    try:
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//dt[text()='Aggregates:']/following-sibling::dd"))
        )
        
        aggregates_section = driver.find_element(By.XPATH, "//dt[text()='Aggregates:']/following-sibling::dd")
        aggregates_text = aggregates_section.text.strip()

        retries = 5
        delay = 5

        while 'Calculating...' in aggregates_text and retries > 0:
            time.sleep(delay)
            aggregates_section = driver.find_element(By.XPATH, "//dt[text()='Aggregates:']/following-sibling::dd")
            aggregates_text = aggregates_section.text.strip()
            retries -= 1

        if 'Calculating...' in aggregates_text:
            print(f"Aggregates section still contains 'Calculating...' for player ID {player_id}")
            return

        clean_text = aggregates_text.replace('\n', ' ').strip()
        lines = clean_text.split(' ')
        aggregates_data = {}
        for i in range(0, len(lines), 2):
            key = lines[i].strip(':')
            value = lines[i+1] if i+1 < len(lines) else ''
            try:
                aggregates_data[key] = int(value)
            except ValueError:
                aggregates_data[key] = 0

        player_data = {
            'id': player_id,
            'full_name': driver.find_element(By.XPATH, "//dt[text()='Full name']/following-sibling::dd").text.strip(),
            'position': driver.find_element(By.XPATH, "//dt[text()='Position']/following-sibling::dd").text.strip(),
            'birthday': driver.find_element(By.XPATH, "//dt[text()='Birthday']/following-sibling::dd").text.strip(),
            'nationality': driver.find_element(By.XPATH, "//dt[text()='Nationality']/following-sibling::dd").text.strip(),
            'current_team': driver.find_element(By.XPATH, "//dt[text()='Current Team']/following-sibling::dd").text.strip(),
            'contract': driver.find_element(By.XPATH, "//dt[text()='Contract']/following-sibling::dd").text.strip(),
            'market_value': driver.find_element(By.XPATH, "//dt[text()='Est. market value']/following-sibling::dd").text.strip(),
            'preferred_foot': driver.find_element(By.XPATH, "//dt[text()='Preferred foot']/following-sibling::dd").text.strip(),
            'matches_in_database': driver.find_element(By.XPATH, "//dt[text()='Matches in database']/following-sibling::dd").text.strip(),
            'matches': aggregates_data.get('Matches', 0),
            'goals': aggregates_data.get('Goals', 0),
            'assists': aggregates_data.get('Assists', 0),
            'starting_xi': aggregates_data.get('Starting XI', 0),
            'on_bench': aggregates_data.get('On bench', 0),
            'on_pitch': aggregates_data.get('On pitch', 0),
            'pitch_time': aggregates_data.get('Pitch time', 0),
            'subbed_in': aggregates_data.get('Subbed in', 0),
            'subbed_out': aggregates_data.get('Subbed out', 0)
        }

        # Inserisci i dati nel database Supabase
        supabase.table('players_info').upsert({
            'id': player_data['id'],
            'name': player_data['full_name'],
            'position': player_data['position'],
            'birthday': player_data['birthday'],
            'nationality': player_data['nationality'],
            'current_team': player_data['current_team'],
            'contract': player_data['contract'],
            'market_value': player_data['market_value'],
            'preferred_foot': player_data['preferred_foot'],
            'matches_in_database': player_data['matches_in_database']
        }).execute()

        supabase.table('players_stats').upsert({
            'player_id': player_data['id'],
            'matches': player_data['matches'],
            'goals': player_data['goals'],
            'assists': player_data['assists'],
            'starting_xi': player_data['starting_xi'],
            'on_bench': player_data['on_bench'],
            'on_pitch': player_data['on_pitch'],
            'pitch_time': player_data['pitch_time'],
            'subbed_in': player_data['subbed_in'],
            'subbed_out': player_data['subbed_out']
        }).execute()

        print(f"Data for player ID {player_id} fetched and inserted/updated.")
    
    finally:
        driver.quit()

def fetch_all_player_ids():
    response = supabase.table('players').select('id').execute()
    player_ids = [row['id'] for row in response.data]
    return player_ids

def main():
    player_ids = fetch_all_player_ids()
    
    if not player_ids:
        print("No player IDs found. Exiting.")
        return

    # Usa ThreadPoolExecutor per eseguire richieste in parallelo
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(fetch_player_data, player_id) for player_id in player_ids]
        for future in concurrent.futures.as_completed(futures):
            try:
                future.result()
            except Exception as e:
                print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
