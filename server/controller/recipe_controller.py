import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)

from flask import current_app as app

from werkzeug.security import check_password_hash, generate_password_hash


domain = 'https://api.spoonacular.com/recipes/'

def getRandomRecipes():
    request = requests.get(domain + 'random?number=1&apiKey=' + app.config['API_KEY'])

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


def getSimilarRecipes(recipeId):
	request = requests.get(domain + recipeId + '/similar?number=3&apiKey=' + app.config['API_KEY'])

	return request.json()


def getSearchRecipes(searchTerm, offset):
	request = requests.get(domain + '/search?query=' + searchTerm + '&offset=' + offset + '&number=1&apiKey=' + app.config['API_KEY'])

	return request.json()


def getTypeRecipes(dishType, offset):
	request = requests.get(domain + '/search?offset=' + offset + '&type=' + dishType + '&number=1&apiKey=' + app.config['API_KEY'])

	return request.json()