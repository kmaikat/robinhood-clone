from flask import Flask, Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import News, db
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
    feed = data["feed"]
    article_data = [{"source": article["source"], "title": article["title"],
                     "image": article["banner_image"], "url": article["url"],
                     "tickers": [stock["ticker"] for stock in article["ticker_sentiment"]]} for article in feed]
    return jsonify(article_data[:25])

# add article to likes
# when a user clicks on the like button, likes is incremented by one
# the news' likes is now true, hence added to the liked-list
# @news_routes.route("/")
# def add_news_like():


# delete the article from likes

@news_routes.route("/<string:ticker>")
def get_news_by_ticker(ticker):
    news_api_keys =  os.getenv("NEWS_API_KEYS").split(",")
    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey={choice(news_api_keys)}&tickers={ticker}&sort=LATEST'
    r = requests.get(url)
    data = r.json()
    feed = data["feed"]
    article_data = [{"source": article["source"], "title": article["title"],
                     "image": article["banner_image"], "url": article["url"],
                     "tickers": [stock["ticker"] for stock in article["ticker_sentiment"]]} for article in feed]
    return jsonify(article_data[:25])
