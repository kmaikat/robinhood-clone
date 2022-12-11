from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, WatchList 
from ..forms import WatchListForm




watchlist_routes =  Blueprint('watchlists', __name__)

# def get_login_userid():
#     user = User.query.get() 


@watchlist_routes.route('/')
@login_required
def all_watchlists():
    """
    Query for all watchlists and returns them in a list of watchlist dictionaries
    """
    watchlists = WatchList.query.all()
    return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}

@watchlist_routes.route('/', methods=['POST'])
@login_required
def create_watchlist(): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    form = WatchListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        try: 
            new_watchlist = WatchList(
                name = form.data['name'],
                user_id = current_user_id
            )
            db.session.add(new_watchlist)
            db.session.commit()
            return new_watchlist.to_dict()
        except Exception:
            return {'error': 'there is an error in form.validate()'}
    if form.errors: 
        return {'error': form.errors}


@watchlist_routes.route('/<int:user_id>')
@login_required
def user_watchlists(user_id): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    if current_user_id != user_id: 
        return {'error': 'user_id does not match'}
    """
    Query for all user_watchlists and returns them in a list of user_watchlist dictionaries
    """
    user_watchlists = WatchList.query.filter(WatchList.user_id == user_id).all()
    print(user_watchlists)
    return {'watchlists': [watchlist.to_dict() for watchlist in user_watchlists]}
