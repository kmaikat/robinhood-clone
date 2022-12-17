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


@user_routes.route("/transaction", methods=["PUT"])
def update_buying_power():
    data = request.get_json()
    data["csrf_token"] = request.cookies['csrf_token']
    transactionForm = TransactionForm(**data)
    total_cost = data["price"] * data["quantity"]

    if not data["quantity"] > 0:
        return jsonify({"errors": {"amount": "Amount cannot be 0 "}}), 400

    if transactionForm.validate_on_submit():
        user = User.query.get(current_user.id)
        data["user_id"] = user.id
        transactionData = {**data}
        del transactionData["name"]
        del transactionData["csrf_token"]
        if total_cost > user.buying_power and data["transaction_type"] == "buy":
            return jsonify({"errors": {"amount": "not enough funds."}}), 400

        stock = Asset.query.filter(Asset.user_id == user.id).filter(
            Asset.symbol.ilike(data["symbol"])).one_or_none()

        if not stock and data["transaction_type"] == "buy":
            data["avg_price"] = data["price"]
            assetForm = AssetForm(**data)

            if assetForm.validate_on_submit():
                del data['csrf_token']
                del data["transaction_type"]
                del data["price"]
                transction = Transaction(**transactionData)
                stock = Asset(**data)
                stock.quantity = data["quantity"]
                stock.avg_price = data["avg_price"]
                user.buying_power = user.buying_power - total_cost
                db.session.add_all([transction, stock])
                db.session.commit()
                response = user.to_dict()
                response["assets"] = {asset.symbol: asset.to_dict()
                                      for asset in user.assets}

                totalStock = sum([asset.quantity for asset in user.assets])
                response["totalStock"] = totalStock
                return jsonify(response), 201

        if data["quantity"] > stock.quantity and data["transaction_type"] == "sell":
            return jsonify({"errors": {"amount": "not enough stock"}}), 400

        if stock and data["transaction_type"] == "buy":
            final_quant = stock.quantity + data["quantity"]
            final_price = (stock.quantity * stock.avg_price) + \
                (data["price"] * data["quantity"])
            data["avg_price"] = final_price / final_quant
            data["quantity"] = data["quantity"] + stock.quantity
        elif stock and data["transaction_type"] == "sell":
            data["avg_price"] = stock.avg_price
            data["quantity"] = stock.quantity - data["quantity"]

        assetForm = AssetForm(**data)

        if assetForm.validate_on_submit():
            transction = Transaction(**transactionData)

            stock.quantity = data["quantity"]
            stock.avg_price = data["avg_price"]

            if data["transaction_type"] == "buy":
                user.buying_power = user.buying_power - total_cost
            else:
                user.buying_power = user.buying_power + total_cost

            if stock.quantity == 0:
                db.session.delete(stock)
                db.session.add(transction)
                db.session.commit()
                response = user.to_dict()
                response["assets"] = {asset.symbol: asset.to_dict()
                                      for asset in user.assets}

                totalStock = sum([asset.quantity for asset in user.assets])
                response["totalStock"] = totalStock
                return jsonify(response)

            db.session.add(transction)
            db.session.commit()
            response = user.to_dict()
            response["assets"] = {asset.symbol: asset.to_dict()
                                  for asset in user.assets}

            totalStock = sum([asset.quantity for asset in user.assets])
            response["totalStock"] = totalStock
            return jsonify(response)

        else:
            return jsonify({"errors": assetForm.errors}), 400
    else:
        return {"errors": transactionForm.errors}, 400
