from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired



class AddStockForm(FlaskForm):
    symbol = StringField('symbol', validators=[DataRequired()])
