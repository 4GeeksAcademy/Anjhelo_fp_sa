"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


bcrypt = Bcrypt()
jwt = JWTManager()


# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def registrar_usuario():
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"error": "Name, email nad password are required"}), 404

        existing_user = User.query.filter_by(email = email).first()
        if existing_user:
            return jsonify({"error": "Email already exists."}), 409

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(name = name, email = email, password = password_hash)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message":"ok"}), 200
        
    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500
    

@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 404
        
        login_user = User.query.filter_by(email = email).one()

        if not login_user:
            return jsonify({"error": "Email not found"}), 404
        
        password_hash = login_user.password
        coincide = bcrypt.check_password_hash(password_hash, password)

        if coincide:
            user_id = login_user.id
            user_token = create_access_token(identity=user_id)

            return jsonify({"token": user_token,})





    except Exception as e:
        return jsonify({"error": "Internal server error", "message": str(e)}), 500