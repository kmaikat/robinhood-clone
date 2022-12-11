from flask import Flask, Blueprint
from flask_login import login_required, current_user
from app.models import WatchList 




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
