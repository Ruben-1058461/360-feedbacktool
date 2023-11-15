from backend.app import db
from backend.models.UserModel import User
from werkzeug.security import generate_password_hash, check_password_hash

from flask import Blueprint, request, jsonify, session


class AuthController():
    @staticmethod
    def signup(request):
        data = request.get_json()

        # Retrieve the required fields from the JSON data
        name = data.get('name')
        password = data.get('password')

        # Hash the password into the database
        hashed_password = generate_password_hash(data['password'], method='sha256')

        # Validate if the required fields are present or not
        if not name or not password:
            return jsonify({'message': 'Missing username or password'}), 400

        # Check if the name already exists or not
        if User.query.filter_by(name=name).first():
            return jsonify({'message': 'name already exists'}), 409

        # Create a new user
        new_user = User(name=data['name'], email=data['email'], password=hashed_password, role=data['role'])
        # Save the users to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully!'})

    @staticmethod
    def login(request):
        data = request.get_json()

        # Retrieve the required fields from the JSON data
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id  # Store the user ID in the session
            session['user_name'] = user.name  # Store the user name in the session
            return jsonify({'message': 'Login successful!', 'user_name': user.name})
        else:
            return jsonify({'message': 'Invalid email or password'}), 401

    @staticmethod
    def logout(session):
        session.pop('user_id', None)  # Remove the user ID from the session
        return jsonify({'message': 'Logout successful!'})
