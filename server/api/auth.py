import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import json

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

    sendConfirmationEmail()

    # User not exist
    if (user == None):
        return jsonify({'success': False, 'message': 'Email does not exist'}), 200

    # Compare user's password with hashed password
    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        encoded = jwt.encode(
            {'userId': str(user['_id'])}, app.config['JWT_KEY'], algorithm='HS256')

        return jsonify({'success': True, 'message': 'Login successfully', 'token': encoded.decode('utf-8')}), 201
    else:
        return jsonify({'success': False, 'message': "Incorrect password"}), 200


def getUser(email):
    users = db.instance.users

    user = users.find_one({'email': email})

    return user


def sendConfirmationEmail():
    message = Mail(
        from_email='support@hexameal.com',
        to_emails='100080426@students.swinburne.edu.my',
        subject='Welcome to Hexameal! Confirm your email',
        html_content='<strong>and easy to do anywhere, even with Python</strong>')


    message.template_id = 'd-9960b60c44fd4f3792e00736de89045b'

    try:
        sendgrid_client = SendGridAPIClient(app.config['SENDGRID_API'])
        response = sendgrid_client.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)


# @bp.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('auth.login'))
