from flask import Blueprint, request, jsonify
from flask_login import login_required
from ..models.user import User

file_upload_sample_routes = Blueprint('file_upload', __name__)

# @login_required
@file_upload_sample_routes.route('/upload/<int:id>', methods=['POST'])
def file_upload(id):
    user = User.query.get(id)

    try:
        file = request.files['file']
        file_url = user.upload_profile(file)

        return {'file': file_url}

    except Exception as e:
        return {'error': 'Something went wrong'}, 500
