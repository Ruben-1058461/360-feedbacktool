from flask import Blueprint, jsonify, request
from backend.config import Config
from backend.controllers.AnswerController import AnswerController

# Create a Blueprint for the answer API
answer_api = Blueprint('answer_api', __name__, url_prefix=Config.answers_api_prefix)

# Endpoint for testing the answer API
@answer_api.route("/test", methods=['GET'])
def test_answer_api():
    return "Hello answers"

# Endpoint to retrieve all answers
@answer_api.route("", methods=['GET'])
def show_all_answers():
    return AnswerController.get_all_answers()

# Endpoint to create a new answer
@answer_api.route('', methods=['POST'])
def create_answer():
    return AnswerController.store()

# Endpoint to retrieve a specific answer by ID
@answer_api.route('/<token>', methods=['GET'])
def show_answer(token):
    print("token: ", token)
    return AnswerController.get_questions_by_survey_id(token)

# Endpoint to update a specific answer by ID
@answer_api.route('/<id>', methods=['POST'])
def update_answer(id):
    return AnswerController.update(id)

# Endpoint to delete a specific answer by ID
@answer_api.route('/<id>', methods=['DELETE'])
def delete_answer(id):
    return AnswerController.delete(id)

# Endpoint to retrieve all answers for a specific question
# @answer_api.route('/question/<question_id>', methods=['GET'])
# def show_answers_for_question(question_id):
#     return AnswerController.show_answers_for_question(question_id)
