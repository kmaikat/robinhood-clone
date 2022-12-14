from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models.user import User

file_upload_sample_routes = Blueprint('file_upload', __name__)

@login_required
@file_upload_sample_routes.route('/upload', methods=['POST'])
def file_upload():
    try:
        file = request.files['file']
        file_url = current_user.upload_profile(file)

        return {'file': file_url}

    except Exception as e:
        return {'error': 'Something went wrong'}, 500

@login_required
@file_upload_sample_routes.route('/upload', methods=['DELETE'])
def remove_profile():
    try:
        current_user.delete_profile()
        return {'message': 'Successfully removed'}
    except:
        return {'error': 'Something went wrong'}, 500
