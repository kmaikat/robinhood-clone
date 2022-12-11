from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class WatchListForm(FlaskForm): 
    name = StringField('List Name', validators=[DataRequired('Please input name.')])
