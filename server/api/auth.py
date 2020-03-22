import functools
from passlib.hash import pbkdf2_sha256

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
from werkzeug.security import check_password_hash, generate_password_hash

from server.controller import aws_controller


bp = Blueprint('auth', __name__)


@bp.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    password = request.form['password']

    hashed_password = pbkdf2_sha256.hash(password)

    result = aws_controller.post_user(email, hashed_password)

    if result['status'] == 'success':
        return redirect(url_for('route.login'))

    return redirect(url_for('route.register'))


@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    result = aws_controller.getUser(email, password)

    print(result['status'])
    if result['status'] == 'success':
        return redirect(url_for('route.home'))

    data = {'message': 'Login credential invalid'}

    response = Response(
        response=json.dumps(data),
        status=401,
    )

    return response


@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('auth.login'))
