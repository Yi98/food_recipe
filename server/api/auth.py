from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify, json, Response
)
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import json
import bcrypt
import jwt
from bson import Binary, Code
from bson.json_util import dumps
from bson import ObjectId


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

    user = getUser(email)

    # user exists and verified
    if (user != None and user['verified'] == True):
        return jsonify({'message': 'Email already exists'})

    # user exists but not verified
    if (user != None and user['verified'] == False):
        return jsonify({'success': True, 'message': f"A verification email has been sent to {email}"}), 201

    user = users.insert_one(
        {'email': email, 'password': hashed, 'verified': False})

    sendVerificationEmail(email, user.inserted_id)

    # user does not exist
    return jsonify({'success': True, 'message': f"A verification email has been sent to {email}"}), 201


@bp.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    user = getUser(email)

    # User not exist
    if (user == None):
        return jsonify({'success': False, 'message': 'Email does not exist'}), 200

    if (user['verified'] == False):
        return jsonify({'success': False, 'message': f"Please confirm your email address to continue. Resend verification email."}), 201

    # Compare user's password with hashed password
    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        encoded = jwt.encode(
            {'userId': str(user['_id'])}, app.config['JWT_KEY'], algorithm='HS256')

        return jsonify({'success': True, 'message': 'Login successfully', 'token': encoded.decode('utf-8')}), 201
    else:
        return jsonify({'success': False, 'message': "Incorrect password"}), 200


@bp.route('/confirm', methods=['GET'])
def confirmEmail():
    users = db.instance.users

    # fix this
    user = users.update_one({'_id': ObjectId(request.args.get('token'))}, {
                            '$set': {'verified': True}}, upsert=False)

    # add a link back to dashboard
    # return jsonify({'message': 'Email verified. You can proceed to login now'})
    return '<h1>Email verified. <a href="../../index.html">Proceed to login</a></h1>'


@bp.route('/resend', methods=['POST'])
def resendEmail():
    user = getUser(request.form['email'])

    if (user != None and user['verified'] == False):
        sendVerificationEmail(user['email'], user['_id'])

    return jsonify({'success': True, 'message': f"A verification email has been sent to {user['email']}"}), 201


def getUser(email):
    users = db.instance.users

    user = users.find_one({'email': email})

    return user


def sendVerificationEmail(email, id):
    link = 'http://127.0.0.1:5000/api/auth/confirm?token=' + str(id)
    # link = "https://hexameal.com/api/auth/confirm?token=" + str(id)

    message = Mail(
        from_email='support@hexameal.com',
        to_emails=email,
        subject='Welcome to Hexameal! Confirm your email',
        html_content='<strong>and easy to do anywhere, even with Python</strong>')

    message.dynamic_template_data = {
        "link": link
    }

    message.template_id = 'd-9960b60c44fd4f3792e00736de89045b'

    try:
        sendgrid_client = SendGridAPIClient(app.config['SENDGRID_API'])
        response = sendgrid_client.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
