from flask.cli import AppGroup
from .users import seed_users, undo_users
from .asset import seed_assets, undo_assets
from .watchlist import seed_watchlists, undo_watchlists
from .watchlist_stock import seed_watchlist_stocks, undo_watchlist_stocks
from .transactions import seed_transaction, undo_transaction
from .news import seed_news, undo_news
from .stock_symbols import seed_stock_symbol, undo_stock_symbol
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_news()
        undo_transaction()
        undo_watchlist_stocks()
        undo_watchlists()
        undo_assets()
        undo_users()
        undo_stock_symbol()
    seed_stock_symbol()
    seed_users()
    seed_assets()
    seed_watchlists()
    seed_watchlist_stocks()
    seed_transaction()
    seed_news()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_assets()
    undo_users()
    undo_watchlists()
    undo_watchlist_stocks()
    undo_transaction()
    undo_news()
    undo_stock_symbol()
    # Add other undo functions here
