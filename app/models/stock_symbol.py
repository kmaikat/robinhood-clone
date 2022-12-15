from .db import db, environment, SCHEMA, add_prefix_for_prod

class StockSymbol(db.Model):
    __tablename__ = 'stock_symbols'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    stock_symbol = db.Column(db.String(10), nullable=False)
    company = db.Column(db.String, nullable=False)
