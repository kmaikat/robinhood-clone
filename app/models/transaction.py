from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    stock_symbol = db.Column(db.String(10), db.ForeignKey(add_prefix_for_prod('assets.symbol')), nullable=False)
    transaction_type = db.Column(db.String(20), nullable=False) # buying / selling ?
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    transaction_time = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    asset = db.relationship('Asset', back_populates='transactions')
    user = db.relationship('User', back_populates='transactions')
