from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import requests
import time
import json

chrome_options = Options()
chrome_options.add_argument("--headless")

timeout = 10


class amazonScraper:
    def __init__(self) -> None:
        #self.driver = webdriver.Chrome(ChromeDriverManager().install(),options=chrome_options)
        self.driver = webdriver.Chrome(ChromeDriverManager().install())

        self.datas = []
        self.amount_data = 0
    
    def searchProduct(self,q_page: int,product : str):

        url = f"https://www.amazon.com.br/s?k={product}"
        self.driver.get(url)

        for page in range(0,q_page):
            n_url = url + f"&{page}"
            try: 
                response = requests.get(n_url,timeout = timeout)
            except requests.exceptions.Timeout:  # se o tempo limite for atingido
                return -1
            except requests.exceptions.RequestException as e: # outras exceções de solicitação
                return e
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content,"html.parser")
                resultS = soup.find_all('div',{'class':'s-result-item', 'data-component-type':'s-search-result'})

                for result in resultS:
                    data = dict()
                    data["productName"] = result.h2.text
                    data["url_product"] = "https://www.amazon.com.br" + result.h2.a['href']
                    
                    rating, rating_count = 0, 0
                    try:
                        rating = result.find('i',{'class':'a-icon'}).text
                        rating_count = result.find('span',{'class':'a-size-base s-underline-text'}).text

                        data["rating"] = (rating,rating_count)
                    except:
                        pass

                    try:
                        price1 = result.find('span',{'class':'a-price-whole'}).text.replace(".","")
                        price2 = result.find('span',{'class':'a-price-fraction'}).text
                        
                        data["price"] = float(price1.replace(",",".") + price2)
                    except:
                        pass
                    
                    #Aqui excluir entradas que contenha descrição tipo livro
                    try:
                        desConten = result.find("a",{"class":"a-size-base"}).text
                    except:
                        pass

                    self.datas.append(data)
        
    def toString(self):
        for data in self.datas:
            # Use json.dumps para serializar o dicionário em formato JSON
            json_data = json.dumps(data, indent=4, ensure_ascii=False)
            print(json_data)



if __name__ == "__main__":
    scraper = amazonScraper()
    scraper.searchProduct(1, "PS4")
    scraper.toString()
    
    time.sleep(100)