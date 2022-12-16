from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, InputRequired, ValidationError


def checkZero():
    def _checkZero(form, field):
        if type(field.data) is float and field.data >= 0.00:
            return True
        else:
            raise ValidationError("Amount cannot be less than 0")
    return _checkZero


class AssetForm(FlaskForm):
    symbol = StringField("Symbol", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    quantity = FloatField("Quantity", [checkZero()])
    avg_price = FloatField("Average Price", [DataRequired()])
