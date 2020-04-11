import os

from flask import (Flask, render_template, url_for, redirect)

from server.routes import route
from server.api import (auth, recipe)


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # setting config variable
    # app.config.from_pyfile('config.py')
    app.config['API_KEY'] = os.environ['API_KEY']

    # blueprint for route and api endpoints
    app.register_blueprint(route.bp, url_prefix='/')
    app.register_blueprint(auth.bp, url_prefix='/api/auth')
    app.register_blueprint(recipe.bp, url_prefix='/api/recipe')

    return app
