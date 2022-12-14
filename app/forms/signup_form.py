from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError, Length, NumberRange
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField("First Name", [DataRequired()])
    last_name = StringField("Last Name", [DataRequired()])
    email = StringField('email', validators=[
                        DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), Length(min=10)])
    buying_power = FloatField(
        "Buying Power", [DataRequired(), NumberRange(max=10000000)])
    username = StringField('username', validators=[user_exists])
