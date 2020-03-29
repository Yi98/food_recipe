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

    # if test_config is None:
    #     # load the instance config, if it exists, when not testing
    #     app.config.from_pyfile('config.py')
    # else:
    #     # load the test config if passed in
    #     app.config.from_mapping(test_config)


    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    app.config['API_KEY'] = 'a2478859405e44f48b5d9037d3ec05c2'

    app.register_blueprint(route.bp, url_prefix='/')
    app.register_blueprint(auth.bp, url_prefix='/api/auth')
    app.register_blueprint(recipe.bp, url_prefix='/api/recipe')


    return app