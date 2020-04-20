import os

from flask import (Flask, render_template, url_for, redirect)
import pymongo

from server.routes import route
from server.api import (auth, recipe, ingredient)
from server.cache import cache
from server.database import db


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    cache.instance.init_app(app)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    app.config.from_pyfile('config.py')

    client = pymongo.MongoClient(app.config['DB_CONNECTION'])
    db.instance = client.hexameal

    # blueprint for route and api endpoints
    app.register_blueprint(route.bp, url_prefix='/')
    app.register_blueprint(auth.bp, url_prefix='/api/auth')
    app.register_blueprint(recipe.bp, url_prefix='/api/recipe')
    app.register_blueprint(ingredient.bp, url_prefix='/api/ingredient')

    return app

