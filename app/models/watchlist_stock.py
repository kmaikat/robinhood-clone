from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class WatchList_Stock(db.Model):
    __tablename__ = "watchlist_stocks"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id")), nullable=False)
    stock_symbol = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)


    watchlist = db.relationship("WatchList", back_populates="watchlist_stocks")

    def to_dict(self):
        return {
            'id': self.id,
            'watchlist_id': self.watchlist_id,
            'stock_symbol': self.stock_symbol
        }
