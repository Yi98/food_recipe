import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash


from server.controller import recipe_controller


bp = Blueprint('recipe', __name__)


@bp.route('/random')
def getRandomRecipes():
    result = recipe_controller.getRandomRecipes()

    return result

@bp.route('/ingredient')
def getRecipeIngredient():
    result = recipe_controller.getRecipeIngredients(request.args.get('recipeId'))

    return result


@bp.route('/instruction')
def getRecipeInstruction():
    result = recipe_controller.getRecipeInstructions(request.args.get('recipeId'))

    return jsonify(result)


@bp.route('/information')
def getRecipeInformation():
    result = recipe_controller.getRecipeInformation(request.args.get('recipeId'))

    return result


@bp.route('/similar')
def getSimilarRecipes():
    result = recipe_controller.getSimilarRecipes(request.args.get('recipeId'))

    return jsonify(result)


@bp.route('/search')
def getSearchRecipes():
    result = recipe_controller.getSearchRecipes(request.args.get('q'), request.args.get('offset'))

    return result


@bp.route('/explore')
def getTypeRecipes():
    result = recipe_controller.getSearchRecipes(request.args.get('type'), request.args.get('offset'))

    return result