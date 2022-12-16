from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired


class TransactionForm(FlaskForm):
    symbol = StringField("Symbol", [DataRequired()])
    transaction_type = StringField("Symbol", [DataRequired()])
    price = FloatField("Price", [DataRequired()])
    quantity = FloatField("Quantity", [DataRequired()])
