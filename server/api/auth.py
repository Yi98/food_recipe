import os

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
import bcrypt
import jwt
from bson import Binary, Code
from bson.json_util import dumps

from server.database import db
from flask import current_app as app


bp = Blueprint('auth', __name__)


@bp.route('/signup', methods=['POST'])
def signup():
    # get all users
    users = db.instance.users

    email = request.form['email']
    password = (request.form['password'])
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    if (getUser(email) != None):
        return jsonify({'message': 'Email already exists'})

    result = users.insert_one({'email': email, 'password': hashed})

    return jsonify({'success': True, 'message': f"A confirmation email has been sent to {email}"}), 201


@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    user = getUser(email)

    # User not exist
    if (user == None):
        return jsonify({'success': False, 'message': 'Email does not exist'}), 200

    # Compare user's password with hashed password
    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        # encoded = jwt.encode(
        #     {'userId': str(user['_id'])}, app.config['JWT_KEY'], algorithm='HS256')

        encoded = jwt.encode(
            {'userId': str(user['_id'])}, os.environ.get('JWT_KEY'), algorithm='HS256')

        return jsonify({'success': True, 'message': 'Login successfully', 'token': encoded.decode('utf-8')}), 201
    else:
        return jsonify({'success': False, 'message': "Incorrect password"}), 200


def getUser(email):
    users = db.instance.users

    user = users.find_one({'email': email})

    return user

# @bp.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('auth.login'))
