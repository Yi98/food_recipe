import boto3
from botocore.exceptions import ClientError
from flask import (flash, url_for, redirect, jsonify)
from passlib.hash import pbkdf2_sha256

dynamodb = boto3.resource('dynamodb', region_name='ap-southeast-1')
table = dynamodb.Table('foodrecipe_User')  # pylint: disable=no-member


def getUser(email, password):
    try:
        response = table.get_item(
            Key={
                'email': email,
            }
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        if 'Item' in response:
            if pbkdf2_sha256.verify(password, response['Item']['password']):
                return {'status': 'success'}

        return {'status': 'failure'}



def post_user(email, password):
    user = checkIfUserExist(email)

    hashed_password = pbkdf2_sha256.hash(password)

    if (user is None):
        response = table.put_item(
            Item={
                'email': email,
                'password': hashed_password
            }
        )
        return {'status': 'success'}

    return {'status': 'failure'}



def checkIfUserExist(email):
    try:
        response = table.get_item(
            Key={
                'email': email,
            }
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        if 'Item' in response:
            return response['Item']

        return None