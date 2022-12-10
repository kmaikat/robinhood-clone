from app.models import db, WatchList, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_watchlists():
    watchlist1 = WatchList(
        name="Tech Stocks",
        user_id=1
    )
    watchlist2 = WatchList(
        name="My Fav Stocks",
        user_id=2
    )
    watchlist3 = WatchList(
        name="Retail",
        user_id=3
    )

    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM watchlists")

    db.session.commit()
