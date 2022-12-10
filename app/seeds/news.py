from app.models import db, News, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_news():
    seed_data = [
        {
            'like': True,
            'article_link': 'https://google.com',
            'user_id': 1,
        },
        {
            'like': False,
            'article_link': 'https://apple.com',
            'user_id': 1,
        },
        {
            'like': True,
            'article_link': 'https://asus.com',
            'user_id': 3,
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
        db.session.add(News(**d))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_news():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.news RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM news")

    db.session.commit()
