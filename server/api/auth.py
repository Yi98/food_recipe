from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
from werkzeug.security import check_password_hash, generate_password_hash
from server.database import db


bp = Blueprint('auth', __name__)


@bp.route('/signup', methods=['POST'])
def signup():
    email = request.form['email']
    password = request.form['password']

    users = db.instance.users

    if (getUser(email) != None):
        return jsonify({'message': 'User already exists'})

    user_data = {'email': email, 'password': password}
    result = users.insert_one(user_data)

    return jsonify({'message': 'succeed'}), 201


@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']


def getUser(email):
    users = db.instance.users

    user = users.find_one({'email': email})

    return user

# @bp.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('auth.login'))
