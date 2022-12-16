from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Asset, Transaction, db
from app.forms import TransactionForm, AssetForm

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


@user_routes.route("/update-buying-power", methods=["PUT"])
def update_buying_power():
    data = request.get_json()
    data["csrf_token"] = request.cookies['csrf_token']
    transactionForm = TransactionForm(**data)
    if transactionForm.validate_on_submit():
        user = User.query.get(1)
        if data["quantity"] * data["price"] > user.buying_power:
            return jsonify({"errors": {"amount": "not enough funds."}})

        stock = Asset.query.filter(Asset.user_id == user.id).filter(
            Asset.symbol.ilike(data["symbol"])).one()

        data["user_id"] = user.id
        transactionData = {**data}
        del transactionData["name"]
        del transactionData["csrf_token"]

        if stock:
            final_quant = stock.quantity + data["quantity"]
            final_price = (stock.quantity * stock.avg_price) + \
                (data["price"] * data["quantity"])
            data["avg_price"] = final_price / final_quant
            data["quantity"] = data["quantity"] + stock.quantity

        assetForm = AssetForm(**data)

        if assetForm.validate_on_submit():
            del data['csrf_token']
            del data["transaction_type"]
            del data["price"]

            transction = Transaction(**transactionData)
            asset = Asset.query.filter(Asset.symbol == data["symbol"]).one()
            asset.quantity = data["quantity"]
            asset.avg_price = data["avg_price"]

            db.session.add(transction)
            db.session.commit()
            return asset.to_dict()
        else:
            return jsonify({"errors": assetForm.errors})
    else:
        return {"errors": transactionForm.errors}
