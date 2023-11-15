from backend.models.SurveyModel import Survey
from backend.models.AnswerModel import Answer
from backend.models.SurveyTeamModel import SurveyTeam
from flask import jsonify, request
from backend.app import db


class AnswerController():

    # Retrieve all answers from the database
    @staticmethod
    def get_all_answers():
        answers = Answer.query.all()
        return jsonify([answer.to_dict() for answer in answers])

    # Retrieve a specific answers from the database by survey token
    @staticmethod
    def get_answers_by_survey_token(survey_token):
        survey = Survey.query.filter_by(token=survey_token).first()
        answers = Answer.query.filter_by(survey_id=survey.id).all()
        return jsonify([answer.to_dict() for answer in answers])

    @staticmethod
    def get_questions_by_survey_id(token):
        print("sfdsdfsfdtoken: ", token)
        survey = Survey.query.filter_by(token=token).first()
        if survey:
            return jsonify(survey.to_dict())
        return jsonify({'error': 'Survey not found.'}), 404


    # Create a new answer in the database
    @staticmethod
    def store():
        data = request.get_json()
        answers = data['answers']
        print(answers)
        for answer in answers:
            answer = Answer(
                user_id='Anoniem',
                question_id=answer['question_id'],
                text=answer['value']
            )
            db.session.add(answer)
            db.session.commit()

        return 'Added answers to database', 201