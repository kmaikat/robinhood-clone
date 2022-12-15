from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.datastructures import FileStorage
from flask_login import UserMixin
from datetime import datetime
from .assets import Asset

import os
import boto3

s3 = boto3.client(
    's3',
    aws_access_key_id = os.environ.get('S3_KEY'),
    aws_secret_access_key = os.environ.get('S3_SECRET')
)

def nick_name_default(context):
    first_name = context.get_current_parameters()['first_name']
    last_name = context.get_current_parameters()['last_name']

    return first_name + ' ' + last_name[0]

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    nick_name = db.Column(db.String, nullable=False, default=nick_name_default)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    buying_power = db.Column(db.Float, default=0.00)
    image_url = db.Column(db.String, nullable=True, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    assets = db.relationship("Asset",
                             back_populates="user",
                             cascade="all, delete-orphan")

    watchlists = db.relationship("WatchList",
                             back_populates="user",
                             cascade="all, delete-orphan")

    transactions = db.relationship("Transaction", back_populates='user', cascade='all, delete-orphan')

    news = db.relationship("News", back_populates='user', cascade='all, delete-orphan')

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
            'email': self.email,
            "buyingPower": self.buying_power,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'nickname': self.nick_name,
            'joinedAt': self.created_at,
            'imageUrl': self.image_url
        }

    def upload_profile(self, file: FileStorage) -> str:
        filename = 'profile-image/' + self.email + '.' + file.filename.split('.')[-1]

        s3.upload_fileobj(
            file,
            os.environ.get('S3_BUCKET'),
            filename,
            ExtraArgs = {
                "ContentType": file.content_type
            }
        )

        self.image_url = f"{os.environ.get('S3_LOCATION')}/{filename}"
        db.session.commit()

        return self.image_url


    def delete_profile(self):
        self.image_url = None
        db.session.commit()

    def update_un_nn(self, nick_name, user_name):
        self.nick_name = nick_name
        self.user_name = user_name

        try:
            db.session.commit()
            return 'Success'
        except:
            return 'Something went wrong'
