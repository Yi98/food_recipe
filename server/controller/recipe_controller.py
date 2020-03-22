import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)

from flask import current_app as app

from werkzeug.security import check_password_hash, generate_password_hash

def getRecipes():
    # TODO: call spoonacular API
    request = requests.get('http://www.google.com')
    print('API_KEY', app.config['API_KEY'])    

    return Response(
        response=json.dumps({'foo': 'bar'}),
        status=200
    )
