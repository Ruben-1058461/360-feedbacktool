from backend.app import db
from backend.models.QuestionModel import Question
from flask import jsonify, request


class QuestionController:

    # Retrieve all questions from the database
    @staticmethod
    def get_all_questions():
        questions = Question.query.all()
        question_dict = [question.to_dict() for question in questions]
        return question_dict

    # Retrieve a specific question by ID from the database
    @staticmethod
    def show_question(id):
        questions = Question.query.filter_by(survey_id=id).all()
        if not questions:
            return 'no data'
        question_list = [question.to_dict() for question in questions]

        return jsonify({'questions': question_list}), 200

    # Create a new question
    @staticmethod
    def store():
        # Retrieve the Question data from the request
        question_data = request.json
        survey_id = request.args.get('surveyId[surveyId]')

        for question in question_data:
            if question['question'] == "":
                return jsonify({'message': 'Question cannot be empty'}), 400

            # Convert the options array to a string
            options = ",".join(question.get('options', []))

            question['type'] = 1 if question['type'] == 'moreOptions' else 0

            # Create a new Question instance with the data
            question = Question(text=question['question'], survey_id=survey_id, type=question['type'], options=options)

            # Save the question to the database
            db.session.add(question)
            db.session.commit()

        return jsonify({'message': 'Questions stored successfully'}), 200

    # Update a question
    @staticmethod
    def edit(id, data):
        for updated_data in data:
            question_id = updated_data['id']
            question = Question.query.get(question_id)
            if not question:
                return jsonify({'message': f'Question not found with ID {question_id}'}), 404

            question.text = updated_data['text']
            question.type = updated_data['type']
            question.options = updated_data['options']

            db.session.add(question)

        db.session.commit()
        return 'ok'

    # Delete a question
    @staticmethod
    def delete_question(id):
        question = Questions.query.get(id)
        if not question:
            return jsonify({'message': 'Question not found'}), 404

        db.session.delete(question)
        db.session.commit()

        return '', 204
