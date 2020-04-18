from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
from werkzeug.security import check_password_hash, generate_password_hash

from server.controller import auth_controller


bp = Blueprint('auth', __name__)


@bp.route('/signup', methods=['POST'])
def register():
    email = request.form['email']
    password = request.form['password']

    result = auth_controller.post_user(email, password)

    if result['status'] == 'success':
        return redirect(url_for('route.login'))

    return redirect(url_for('route.register'))


@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    result = auth_controller.getUser(email, password)

    if result['status'] == 'success':
        return redirect(url_for('route.home'))

    response = Response(
        response=json.dumps({'message': 'Login credential invalid'}),
        status=401,
    )

    return response


# @bp.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('auth.login'))
