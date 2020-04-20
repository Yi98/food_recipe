from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
import bcrypt

from server.database import db


bp = Blueprint('auth', __name__)


@bp.route('/signup', methods=['POST'])
def signup():
    # get all users
    users = db.instance.users

    email = request.form['email']
    password = (request.form['password'])
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    if (getUser(email) != None):
        return jsonify({'message': 'User already exists'})

    result = users.insert_one({'email': email, 'password': hashed})

    return jsonify({'message': 'succeed'}), 201


@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    user = getUser(email)

    # User not exist
    if (user == None):
        return jsonify({'message': 'Invalid cridentials'}), 401

    # Compare user's password with hashed password
    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'message': 'Login in successfully'}), 201
    else:
        return jsonify({'message': 'Invalid cridentials'}), 401


def getUser(email):
    users = db.instance.users

    user = users.find_one({'email': email})

    return user

# @bp.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('auth.login'))
