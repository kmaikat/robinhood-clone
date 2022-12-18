from flask import Flask, Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import News, db
from ..forms import AddArticleForm
import os
import requests
from random import choice
from dotenv import load_dotenv
load_dotenv()

news_routes = Blueprint('news', __name__)


@news_routes.route("/")
def get_all_news():
    news_api_keys = os.getenv("NEWS_API_KEYS").split(",")
    key_choice = choice(news_api_keys)
    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey={key_choice[1]}&sort=LATEST'
    r = requests.get(url)
    data = r.json()
    while ("Note" in data):
        choice_index = news_api_keys.index(key_choice)
        news_api_keys.pop(choice_index)

        if not news_api_keys:
            return jsonify([{"error": "No news found at the moment"}]), 500

        key_choice = choice(news_api_keys)
        url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey={key_choice[1]}&sort=LATEST'
        r = requests.get(url)
        data = r.json()

    if "feed" in data:
        feed = data["feed"]
        article_data = [{"source": article["source"], "title": article["title"],
                        "image": article["banner_image"], "url": article["url"],
                         "tickers": [stock["ticker"] for stock in article["ticker_sentiment"]]} for article in feed if "banner_image" in article and article["banner_image"]]

        return jsonify(article_data[:25])
    else:
        return jsonify({"error": "No news found at the moment"}), 500

# add article to likes
# when a user clicks on the like button, likes is incremented by one
# the news' likes is now true, hence added to the liked-list
# @news_routes.route("/")
# def add_news_like():


# delete the article from likes

@news_routes.route("/<string:ticker>")
def get_news_by_ticker(ticker):
    # return a an enumarated list of keys
    news_api_keys = os.getenv("NEWS_API_KEYS").split(",")
    key_choice = choice(news_api_keys)

    url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey={key_choice[1]}&tickers={ticker}&sort=LATEST'
    r = requests.get(url)
    data = r.json()

    while ("Note" in data):
        choice_index = news_api_keys.index(key_choice)
        news_api_keys.pop(choice_index)
        if not news_api_keys:
            return jsonify([{"error": "No news found at the moment"}]), 500

        key_choice = choice(news_api_keys)
        url = f'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey={key_choice[1]}&tickers={ticker}&sort=LATEST'
        r = requests.get(url)
        data = r.json()

    if "feed" in data:
        feed = data["feed"]
        article_data = [{"source": article["source"], "title": article["title"],
                         "image": article["banner_image"], "url": article["url"],
                         "tickers": [stock["ticker"] for stock in article["ticker_sentiment"]]} for article in feed if "banner_image" in article and article["banner_image"]]
        return jsonify(article_data[:5])
    else:
        return jsonify({"error": "No news found at the moment"}), 500


@news_routes.route("/liked", methods=["GET"])
@login_required
def get_article_like():
    liked = News.query.filter(News.like == '1').filter(
        News.user_id == current_user.id).all()
    return jsonify([news.to_dict() for news in liked]), 200


@news_routes.route("/liked", methods=["POST"])
def add_article_like():
    add_article_form = AddArticleForm()
    add_article_form['csrf_token'].data = request.cookies['csrf_token']
    # sending to the database

    if add_article_form.validate_on_submit():
        new_liked_article = News(
            like=True,
            user_id=add_article_form.data['user_id'],
            title=add_article_form.data['title'],
            source=add_article_form.data['source'],
            image=add_article_form.data['image'],
            article_link=add_article_form.data['article_link']
        )
        db.session.add(new_liked_article)
        db.session.commit()
        return jsonify(new_liked_article.to_dict())
    else:
        print(add_article_form.errors)
        return jsonify(add_article_form.errors), 406


@login_required
@news_routes.route("/liked/<int:news_id>", methods=["DELETE"])
def delete_article_like(news_id):
    # find the liked article where user id is the same as the user_id
    # delete
    article = News.query.get(news_id)
    if current_user.id != article.user_id:
        return {
            "message": "This like does not belong to you"
        }

    db.session.delete(article)
    db.session.commit()
    return {"message": "Deleted like"}
