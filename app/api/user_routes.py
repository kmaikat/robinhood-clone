from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/update', methods=['PUT'])
@login_required
def update():
    update = request.json

    if not update.get('nickname') or not update.get('username'):
        return {'error': 'nickname and username are required'}, 400

    nickname = update.get('nickname')
    username = update.get('username')

    current_user.update_un_nn(nickname, username)

    return {'message': 'successfully updated'}


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route("/<email>")
def findEmail(email):
    """
    Query for an email from the db to see if it is being used already
    """
    user = bool(User.query.filter(User.email.ilike(email)).all())
    if user:
        return jsonify(user), 409
    else:
        return jsonify(user), 200


@user_routes.route("/check-username/<username>")
def find_username(username):
    """
    Query for an username from the db to see if it is being used already
    """
    user = bool(User.query.filter(User.username.ilike(username)).all())
    if user:
        return jsonify(user), 409
    else:
        return jsonify(user), 200
