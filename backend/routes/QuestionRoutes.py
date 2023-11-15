from flask import Blueprint, jsonify, request
from backend.config import Config
from backend.controllers.QuestionController import QuestionController

# Create a Blueprint for the question API
question_api = Blueprint('question_api', __name__, url_prefix=Config.questions_api_prefix)


# Endpoint for testing the question API
@question_api.route("/test", methods=['GET'])
def test_question_api():
    return "Hello questions"


# Endpoint to retrieve all questions
@question_api.route("/all", methods=['GET'])
def get_all_questions():
    return QuestionController.get_all_questions()


# Endpoint to retrieve a specific question by ID
@question_api.route("/<id>", methods=['GET'])
def get_question(id):
    return QuestionController.show_question(id)


# Endpoint to create a new question
@question_api.route('', methods=['POST'])
def create_question():
    return QuestionController.store()


# Endpoint to update a specific question by ID
@question_api.route("/<id>", methods=['POST'])
def update_question(id):
    data = request.get_json()
    return QuestionController.edit(id, data)


# Endpoint to delete a specific question by ID
@question_api.route("/<id>", methods=['DELETE'])
def delete_question(id):
    QuestionController.delete_question(id)

    return jsonify({'message': 'Question deleted successfully'})
