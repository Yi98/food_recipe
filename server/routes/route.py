import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('route', __name__, url_prefix='/')

@bp.route('')
def index():
  	return redirect(url_for('route.register'))

@bp.route('/register')
def register():
    return render_template('register.html')

@bp.route('/login')
def login():
	return render_template('login.html')

@bp.route('/home')
def home():
	return render_template('recipe.html')