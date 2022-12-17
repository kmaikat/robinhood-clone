from app.models import db, WatchList_Stock, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_watchlist_stocks():
    stock1 = WatchList_Stock(
        watchlist_id=1,
        stock_symbol = "AAPL"
    )
    stock2 = WatchList_Stock(
        watchlist_id=1,
        stock_symbol = "TSLA"
    )
    stock3 = WatchList_Stock(
        watchlist_id=2,
        stock_symbol = "GOOG"
    )

    db.session.add(stock1)
    db.session.add(stock2)
    db.session.add(stock3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlist_stocks")

    db.session.commit()
