from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .assets import Asset


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    buying_power = db.Column(db.Float, default=0.00)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    assets = db.relationship(add_prefix_for_prod("Asset"),
                             back_populates=add_prefix_for_prod("user"),
                             cascade="all, delete-orphan")

    watchlists = db.relationship(add_prefix_for_prod("WatchList"),
                             back_populates=add_prefix_for_prod("user"),
                             cascade="all, delete-orphan")

    transactions = db.relationship(add_prefix_for_prod('Transaction'), back_populates=add_prefix_for_prod('user'), cascade='all, delete-orphan')

    news = db.relationship(add_prefix_for_prod('News'), back_populates=add_prefix_for_prod('user'), cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
