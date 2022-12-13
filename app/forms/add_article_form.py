from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, DateField, IntegerField
from wtforms.validators import DataRequired

class AddArticleForm(FlaskForm):
    like = BooleanField('Like')
    user_id = IntegerField("User ID")
    title = StringField("Title")
    source = StringField("Source")
    image = StringField("Image")
    article_link = StringField("Article Link")
