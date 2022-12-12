from flask import Flask, Blueprint
from app.models import News
import os
import requests
from random import choice
from dotenv import load_dotenv
load_dotenv()

news_routes = Blueprint('news', __name__)


@news_routes.route("/")
def get_all_news():
    news_api_keys = os.getenv("NEWS_API_KEYS").split(",")
    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey={choice(news_api_keys)}&sort=LATEST'
    r = requests.get(url)
    data = r.json()
    return data

# add article to likes

@news_routes.route("<string:ticker>")
def get_news_by_ticker(ticker):
    news_api_keys = os.getenv("NEWS_API_KEYS").split(",")
    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey={choice(news_api_keys)}&tickers={ticker}&sort=LATEST'
    r = requests.get(url)
    data = r.json()
    return data
