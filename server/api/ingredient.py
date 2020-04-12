import functools
import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
from werkzeug.security import check_password_hash, generate_password_hash

from flask import current_app as app

bp = Blueprint('ingredient', __name__)
domain = 'https://api.spoonacular.com/food/ingredients/'


@bp.route('/autocomplete')
def getIngredients():
    query = request.args.get('query')

    result = requests.get(domain + 'autocomplete?query=' + query + '&number=10&apiKey=' + app.config['API_KEY'])

    return jsonify(result.json())