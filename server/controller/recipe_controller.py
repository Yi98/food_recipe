import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)

from flask import current_app as app

from werkzeug.security import check_password_hash, generate_password_hash


domain = 'https://api.spoonacular.com/recipes/'

def getRandomRecipes():
    request = requests.get(domain + 'random?number=6&apiKey=' + app.config['API_KEY'])

    return request.json()


def getRecipeIngredients(recipeId):
	request = requests.get(domain + recipeId + '/ingredientWidget.json?apiKey=' + app.config['API_KEY'])

	return request.json()


def getRecipeInstructions(recipeId):
	request = requests.get(domain + recipeId + '/analyzedInstructions?apiKey=' + app.config['API_KEY'])

	return request.json()


def getRecipeInformation(recipeId):
	request = requests.get(domain + recipeId + '/information?apiKey=' + app.config['API_KEY'])

	return request.json()