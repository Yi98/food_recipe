import functools
import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
from werkzeug.security import check_password_hash, generate_password_hash

from flask import current_app as app

bp = Blueprint('recipe', __name__)
domain = 'https://api.spoonacular.com/recipes/'


@bp.route('/random')
def getRandomRecipes():
    result = requests.get(
        domain + 'random?number=6&apiKey=' + app.config['API_KEY'])

    return result.json()


@bp.route('/ingredient')
def getRecipeIngredient():
    recipeId = request.args.get('recipeId')
    result = requests.get(
        domain + recipeId + '/ingredientWidget.json?apiKey=' + app.config['API_KEY'])

    return result.json()


@bp.route('/instruction')
def getRecipeInstruction():
    recipeId = request.args.get('recipeId')

    result = requests.get(
        domain + recipeId + '/analyzedInstructions?apiKey=' + app.config['API_KEY'])

    return jsonify(result.json())


@bp.route('/information')
def getRecipeInformation():
    recipeId = request.args.get('recipeId')

    result = requests.get(domain + recipeId +
                          '/information?apiKey=' + app.config['API_KEY'])

    return result.json()


@bp.route('/similar')
def getSimilarRecipes():
    recipeId = request.args.get('recipeId')

    result = requests.get(domain + recipeId +
                          '/similar?number=3&apiKey=' + app.config['API_KEY'])

    return jsonify(result.json())


@bp.route('/search')
def getSearchRecipes():
    searchTerm = request.args.get('q')
    offset = request.args.get('offset')

    result = requests.get(domain + '/search?query=' + searchTerm +
                          '&offset=' + offset + '&number=6&apiKey=' + app.config['API_KEY'])

    return result.json()


@bp.route('/explore')
def getTypeRecipes():
    dishType = request.args.get('type')
    offset = request.args.get('offset')

    result = requests.get(domain + '/search?offset=' + offset +
                          '&type=' + dishType + '&number=6&apiKey=' + app.config['API_KEY'])

    return result.json()


@bp.route('/fridge')
def getFridgeRecipe():
    ingredients = request.args.get('ingredients')
    offset = request.args.get('offset')

    result = requests.get(domain + 'findByIngredients?number=15&offset=' + offset + '&ignorePantry=true&ranking=2&apiKey=' + app.config['API_KEY'] + '&ingredients=' + ingredients)

    return jsonify(result.json())
