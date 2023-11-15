from flask import Blueprint, request, jsonify, session
from backend.controllers.AuthController import AuthController
from backend.config import Config

user_api = Blueprint('user', __name__, url_prefix=Config.users_api_prefix)

# Create an instance of the AuthController class
auth_controller = AuthController()


# Signup route
@user_api.route('/signup', methods=['POST'])
def signup():
    return auth_controller.signup(request)


# Login route
@user_api.route('/login', methods=['POST'])
def login():
    return auth_controller.login(request)


# Logout route
@user_api.route('/logout', methods=['GET'])
def logout():
    return auth_controller.logout(session)
