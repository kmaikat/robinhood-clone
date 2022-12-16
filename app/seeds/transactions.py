from app.models import db, Transaction, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_transaction():
    seed_data = [
        {
            'user_id': 1,
            'symbol': 'AAPL',
            'transaction_type': 'buying',
            'price': 2.2,
            'quantity': 10000,
            'transaction_time': datetime.utcnow(),
        },
        {
            'user_id': 1,
            'symbol': 'GOOGL',
            'transaction_type': 'buying',
            'price': 3.2,
            'quantity': 20000,
            'transaction_time': datetime.utcnow(),
        },
        {
            'user_id': 1,
            'symbol': 'TSLA',
            'transaction_type': 'buying',
            'price': 1.2,
            'quantity': 100000,
            'transaction_time': datetime.utcnow(),
        },
    ]

    # stock1 = WatchList_Stock(
    #     watchlist_id=1,
    #     stock_symbol = "AAPL"
    # )
    # stock2 = WatchList_Stock(
    #     watchlist_id=1,
    #     stock_symbol = "AAPL"
    # )
    # stock3 = WatchList_Stock(
    #     watchlist_id=2,
    #     stock_symbol = "GOOG"
    # )

    for d in seed_data:
        db.session.add(Transaction(**d))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transaction():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
