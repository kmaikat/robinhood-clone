from flask import Blueprint, request, Response, jsonify
from sqlalchemy import case
from app.models import StockSymbol
from random import choice
from flask_login import login_required
import requests
import os

stock_routes = Blueprint('stock', __name__)


@stock_routes.route('/')
def index():
    return 'hello world'


@stock_routes.route('/search/<string:keyword>')
def search_symbols(keyword):
    result = [{'symbol': item.stock_symbol, 'name': item.company} for item in StockSymbol.query.filter(StockSymbol.stock_symbol.ilike(f'%{keyword}%') | StockSymbol.company.ilike(
        f'%{keyword}%')).order_by(case((StockSymbol.stock_symbol.startswith(keyword), 0), (StockSymbol.company.startswith(keyword), 1), else_=2)).limit(7)]

    return jsonify(result)


@stock_routes.route('/get-data/<string:symbol>')
def get_data(symbol):
    func = request.args.get('func') or 'daily'
    apikey = choice(os.environ.get('STOCK_API_KEYS').split(','))
    url = f'https://www.alphavantage.co/query?function={"TIME_SERIES_DAILY_ADJUSTED" if func == "daily" else "TIME_SERIES_INTRADAY"}&symbol={symbol}&apikey={apikey}&outputsize=full{"&interval=5min" if func == "minutely" else ""}'

    res = requests.get(url).json()
    return res


@stock_routes.route('/get-key')
def get_key():
    apikey = choice(os.environ.get('STOCK_API_KEYS').split(','))

    return {'apikey': apikey}


@stock_routes.route("/company-information/<string:ticker>")
# @login_required
def company_information(ticker):
    apikey = os.environ.get('STOCK_API_KEYS')
    url = f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={ticker}&apikey={apikey}"
    data = requests.get(url).json()

    if "Address" in data:
        company_info = {
            "about": {
                "Address": data["Address"],
                "Description": data["Description"],
                "Industry": data["Industry"],
                "Exchange": data["Exchange"],
                "Name": data["Name"]
            },
            "statistics": {
                "PERatio": data["PERatio"],
                "MarketCap": data["MarketCapitalization"],
                "DividendYield": data["DividendYield"],
                "YearHigh": data["52WeekHigh"],
                "YearLow": data["52WeekLow"],
                "AnalystTargetPrice": data["AnalystTargetPrice"],
                "Sector": data["Sector"],
                "Symbol": data["Symbol"]
            }
        }

        return jsonify(company_info)
    else:
        return jsonify({"errors": "Data not available at the moment"}), 417
