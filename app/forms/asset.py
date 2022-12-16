from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired


class AssetForm(FlaskForm):
    symbol = StringField("Symbol", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    quantity = FloatField("Quantity", [DataRequired()])
    avg_price = FloatField("Average Price", [DataRequired()])
