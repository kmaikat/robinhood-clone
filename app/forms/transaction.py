from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, InputRequired


class TransactionForm(FlaskForm):
    symbol = StringField("Symbol", [DataRequired()])
    transaction_type = StringField("Symbol", [DataRequired(message="Ammount cannot be 0")])
    price = FloatField("Price", [DataRequired()])
    quantity = FloatField("Quantity", [DataRequired()])
