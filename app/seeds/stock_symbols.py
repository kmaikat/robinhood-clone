from app.models import db, StockSymbol, environment, SCHEMA
import os

# Adds a demo user, you can add other users here if you want
def seed_stock_symbol():

    with open(f'{os.path.dirname(__file__)}/active_stocks.csv', 'r') as readfile:
        for line in readfile.readlines()[1:]:
            stock_symbol, company = line.split(',')[:2]
            db.session.add(StockSymbol(stock_symbol=stock_symbol, company=company))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stock_symbol():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.stock_symbols RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM stock_symbols")

    db.session.commit()
