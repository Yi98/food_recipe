import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from server.cache import cache

bp = Blueprint('route', __name__, url_prefix='/')


@bp.route('')
@cache.instance.cached(timeout=3600)
def index():
    return redirect(url_for('route.home'))


@bp.route('/register')
@cache.instance.cached(timeout=3600)
def register():
    return render_template('register.html')


@bp.route('/login')
@cache.instance.cached(timeout=3600)
def login():
    return render_template('login.html')


@bp.route('/home')
@cache.instance.cached(timeout=3600)
def home():
    return render_template('index.html')


@bp.route('/details')
@cache.instance.cached(timeout=3600)
def details():
    return render_template('details.html')


@bp.route('/search')
@cache.instance.cached(timeout=3600)
def search():
    return render_template('search.html')


@bp.route('/explore')
@cache.instance.cached(timeout=3600)
def explore():
    return render_template('explore.html')


@bp.route('/featured')
@cache.instance.cached(timeout=3600)
def featured():
    return render_template('featured.html')


@bp.route('/fridge')
@cache.instance.cached(timeout=3600)
def fridge():
    return render_template('fridge.html')
