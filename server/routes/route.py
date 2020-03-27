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
    return render_template('index.html')


@bp.route('/details')
def details():
    return render_template('details.html')


@bp.route('/search')
def search():
    return render_template('search.html')


@bp.route('/explore')
def explore():
	return render_template('explore.html')