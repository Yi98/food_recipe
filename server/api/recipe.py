import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash


from server.controller import recipe_controller


bp = Blueprint('recipe', __name__)


@bp.route('')
def getRecipes():
    result = recipe_controller.getRecipes()

    return result;
