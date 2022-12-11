from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, WatchList 
from ..forms import WatchListForm




watchlist_routes =  Blueprint('watchlists', __name__)


@watchlist_routes.route('/')
@login_required
def all_watchlists():
    """
    Query for all watchlists and returns them in a list of watchlist dictionaries
    """
    watchlists = WatchList.query.all()
    return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}

#create watchlist 

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

#update watchlist
@watchlist_routes.route('/<int:watchlist_id>', methods=['PUT'])
@login_required
def update_watchlist(watchlist_id): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    update_watchlist = WatchList.query.get(watchlist_id)
    if update_watchlist: 
        if update_watchlist.user_id == current_user_id:
            data = request.get_json()
            update_watchlist.name = data['name']
            db.session.commit()
            return update_watchlist.to_dict()
        else: 
            return {'error': {
                'message': 'Forbidden', 
                'statusCode': 403
            }}
    else: 
        return {'error': {
            'message': 'Can not find watchlist',
            'statusCode': 404
        }}

#delete watchlist
@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist(watchlist_id): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    delete_watchlist = WatchList.query.get(watchlist_id)
    if delete_watchlist: 
        if delete_watchlist.user_id == current_user_id:
            db.session.delete(delete_watchlist)
            db.session.commit()
            return {'message': 'Successfully delete'}
        else: 
            return {'error': {
                'message': 'Forbidden', 
                'statusCode': 403
            }}
    else: 
        return {'error': {
            'message': 'Can not find watchlist',
            'statusCode': 404
        }}

#add stock to watchlist 




@watchlist_routes.route('/current')
@login_required
def user_watchlists(): 
    current_user_info = current_user.to_dict()
    current_user_id = current_user_info['id']
    """
    Query for all user_watchlists and returns them in a list of user_watchlist dictionaries
    """
    user_watchlists = WatchList.query.filter(WatchList.user_id == current_user_id ).all()
    print(user_watchlists)
    return {'watchlists': [watchlist.to_dict() for watchlist in user_watchlists]}
