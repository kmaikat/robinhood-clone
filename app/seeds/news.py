from app.models import db, News, environment, SCHEMA
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_news():
    seed_data = [
        {
            'like': True,
            'user_id': 1,
            'article_link': 'https://slate.com/technology/2022/12/chatgpt-google-chatbots-lamda.html',
            'title': 'How Google Got Smoked by ChatGPT',
            'source': 'Slate',
            'image': 'https://compote.slate.com/images/01fa8cc2-3ae8-4054-8de7-d96e5128af0d.jpeg?crop=5507%2C3671%2Cx0%2Cy0&width=2200',
            'ticker': 'GOOGL'
        },
        {
            "like": False,
            "user_id": 1,
            "article_link": "https://www.ft.com/content/8cd27d16-c996-4dc7-86af-ed6f40ff361c",
            "title": "Apple to end employee gagging clauses after activist campaign",
            "source": "Financial Times",
            "image": "https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fc13a5b78-eed1-4da0-8b42-fdb0643062ad.jpg?dpr=2&fit=scale-down&quality=medium&source=next&width=700",
            "ticker": "AAPL"
        },
        {
            'like': True,
            'user_id': 3,
            'article_link': 'https://www.latimes.com/business/story/2022-12-08/tesla-lawsuit-full-self-driving-technology-failure-not-fraud',
            'title': 'Tesla says its self-driving technology may be a "failure" — but not fraud',
            'source': 'Los Angeles Times',
            'image': 'https://ca-times.brightspotcdn.com/dims4/default/b2f3018/2147483647/strip/true/crop/5333x3555+0+0/resize/1200x800!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa8%2Fe1%2Fe67cf43841b0af9a41ae65e4a7a9%2Fgettyimages-1164576448.jpg',
            'ticker': 'TSLA'
        }
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
