import os

from flask import (Flask, render_template, url_for, redirect)
from flask_cors import CORS
import pymongo

from server.routes import route
from server.api import (auth, recipe, ingredient)
from server.cache import cache
from server.database import db


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True, static_folder='./dist/static', template_folder='./dist')
   
    # Apply CORS to app
    CORS(app)
    # CORS(app, resources={r"/api": {"origins": "https://www.hexameal.com"}})

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
    app.register_blueprint(auth.bp, url_prefix='/api/auth')
    app.register_blueprint(recipe.bp, url_prefix='/api/recipe')
    app.register_blueprint(ingredient.bp, url_prefix='/api/ingredient')
    app.register_blueprint(route.bp, url_prefix='/')


    return app
