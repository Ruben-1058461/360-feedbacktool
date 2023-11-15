from backend.models.SurveyModel import Survey
from backend.models.TeamModel import Team
from backend.models.UserTeamModel import UserTeam
from backend.models.UserModel import User
from backend.models.SurveyTeamModel import SurveyTeam
from flask import jsonify, request
from backend.app import db, mail
from flask_mail import Message
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class SurveyController():
    @staticmethod
    def get_all_surveys():
        surveys = Survey.query.all()
        return jsonify([survey.to_dict() for survey in surveys])

    @staticmethod
    def store():
        # Retrieve the Surveys data from the request
        survey_data = request.json

        # Input validation
        if 'name' not in survey_data or 'teams' not in survey_data:
            return jsonify({'error': 'Invalid Surveys data. Missing required fields.'}), 400

        # Create the Surveys in the database
        survey = Survey(name=survey_data['name'], anonymous=survey_data['anonymous'])
        db.session.add(survey)
        db.session.flush()  # Flush the session to generate the survey ID

        for team_id in survey_data['teams']:
            team = Team.query.get(team_id)
            if team:
                survey_team = SurveyTeam(survey_id=survey.id, team_id=team.id)
                db.session.add(survey_team)

        db.session.commit()

        created_survey = {
            'id': survey.id,
            'name': survey.name,
            'teams': [team.to_dict() for team in survey.teams]
            # Include any other relevant Surveys data
        }

        return jsonify(created_survey), 201  # 201 = Created

    @staticmethod
    def show(id):
        survey = Survey.query.get(id)
        if survey:
            return jsonify(survey.to_dict()), 200

        return jsonify({'error': 'Surveys not found.'}), 404

    @staticmethod
    def update(id):
        survey = Survey.query.get(id)
        if survey:
            survey_data = request.json
            survey.name = survey_data['name']
            survey.anonymous = survey_data['anonymous']

            # Update teams
            team_ids = [team['id'] for team in survey_data.get('teams', [])]
            print(team_ids)
            survey.teams = Team.query.filter(Team.id.in_(team_ids)).all()

            db.session.commit()
            return jsonify(survey.to_dict()), 200

        return jsonify({'error': 'Survey not found.'}), 404

    @staticmethod
    def delete(id):
        survey = Survey.query.get(id)
        if survey:
            db.session.delete(survey)
            db.session.commit()
            return jsonify({'message': 'Surveys deleted successfully.'}), 200

        return jsonify({'error': 'Surveys not found.'}), 404

    def mail_members(id):
        survey_teams = SurveyTeam.query.filter_by(survey_id=id).all()

        email_addresses = []
        for survey_team in survey_teams:
            team_users = (
                User.query
                .join(UserTeam)
                .filter(UserTeam.team_id == survey_team.team_id)
                .all()
            )
            team_email_addresses = [user.email for user in team_users]
            email_addresses.extend(team_email_addresses)
            email_addresses.append("1056362@hr.nl")

        # get survey token from db to generate link for members
        survey = Survey.query.filter_by(id=id).first()
        token = survey.token

        sender_email = 'hogeschoolrotterdam1056362@gmail.com'

        msg = Message('Je bent uitgenodigd om een vragenlijst in te vullen - Dyflexis', sender=sender_email,
                      recipients=email_addresses)

        multipart_body = MIMEMultipart('alternative')
        plain_text = 'Je bent uitgenodigd om een vragenlijst in te vullen'
        html_content = f"<h1>Je bent uitgenodigd om een vragenlijst in te vullen</h1><p>Vul de vragenlijst <a href='http://127.0.0.1/vragenlijst/{token}'>hier</a> in.<br /><br />Deze mail is geautomatiseerd verzonden dus kan niet beantwoord worden.</p>"
        plain_part = MIMEText(plain_text, 'plain')
        html_part = MIMEText(html_content, 'html')

        multipart_body.attach(plain_part)
        multipart_body.attach(html_part)

        msg.body = multipart_body.as_string()
        msg.html = html_content

        mail.send(msg)

        return jsonify("success"), 201
