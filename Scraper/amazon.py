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

timeout = 2
nTry = 10


class amazonScraper:
    def __init__(self) -> None:
        self.driver = webdriver.Chrome(ChromeDriverManager().install(),options=chrome_options)
        #self.driver = webdriver.Chrome(ChromeDriverManager().install())

        self.datas = []
        self.amount_data = 0
    
    def searchProduct(self,q_page: int,product : str):
        url = f"https://www.amazon.com.br/s?k={product}"
        

        for page in range(0,q_page):
            n_url = url + f"&{page + 1}"
            ntry = 0

            response = requests.get(n_url)
            while(response.status_code != 200 and ntry < nTry):
                response = requests.get(n_url)
                ntry+=1
                time.sleep(timeout)
   
            
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
                        print(desConten)
                    except:
                        pass

                    self.datas.append(data)
        
    def toString(self):
        for data in self.datas:
            json_data = json.dumps(data, indent=4, ensure_ascii=False)
            print(json_data)




if __name__ == "__main__":
    scraper = amazonScraper()
    e = scraper.searchProduct(1, "geladeira+eletrolux")
    scraper.toString()
    
    