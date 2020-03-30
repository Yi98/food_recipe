import os

from flask import (Flask, render_template, url_for, redirect)

from server.routes import route
from server.api import (auth, recipe)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'server.sqlite'),
    )

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    # app.config.from_pyfile('config.py')
    app.config['API_KEY'] = os.environ['API_KEY']


    app.register_blueprint(route.bp, url_prefix='/')
    app.register_blueprint(auth.bp, url_prefix='/api/auth')
    app.register_blueprint(recipe.bp, url_prefix='/api/recipe')

    return app