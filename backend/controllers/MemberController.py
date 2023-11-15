from backend.app import db
from backend.models.UserModel import User
from backend.models.TeamModel import Team
from backend.models.UserTeamModel import UserTeam
from backend.models.SurveyTeamModel import SurveyTeam
from flask import jsonify, request, redirect, url_for

""" This class handles the logic and operations related to the Members of the application.
    It provides methods to retrieve, create, update, and delete Members. """
class MemberController():
    
    # Retrieve all users from the database
    @staticmethod
    def get_all_members():
        members = User.query.all()
        return jsonify([member.to_dict() for member in members])


    # Retrieve a specific user by ID from the database
    @staticmethod
    def show_member(id):
        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'Member not found'}), 404
        return user.to_dict()

    # Retrieve the name from the request form
    @staticmethod
    def create_member(name, email):
        new_user = User(name=name, email=email, password=None, role=1)

        db.session.add(new_user)
        db.session.commit()

        return new_user.to_dict(), 201

    # Retrieve the user to update by ID from the database
    @staticmethod
    def update_member(id):
        memberName = request.json.get('name')
        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'Member not found'}), 404

        name = memberName

        user.name = name

        db.session.commit()

        return 'Member updated successfully'

    # Retrieve the user to delete by ID from the database
    @staticmethod
    def delete_member(id):
        user = User.query.get(id)
        if not user:
            return jsonify({'message': 'Member not found'}), 404
        db.session.delete(user)
        db.session.commit()
        return '', 204

    @staticmethod
    def add_member_to_team(email, department):

        # filter user id by email
        user = User.query.filter_by(email=email).one()
        if not user:
            return jsonify({'message': 'Member not found'}), 404
        
        # filter team id by email
        team = Team.query.filter_by(name=department).one()
        if not team:
            return jsonify({'message': 'Team not found'}), 404
        
        # add user to team
        new_user_team = UserTeam(user_id=user.id, team_id=team.id)

        db.session.add(new_user_team)
        db.session.commit()

    @staticmethod
    def get_all_members_by_survey(id):
        survey_teams = SurveyTeam.query.filter_by(survey_id=id).all()
        all_users = []

        for survey_team in survey_teams:
            team_users = (
                User.query
                .join(UserTeam)
                .filter(UserTeam.team_id == survey_team.team_id)
                .all()
            )

            users_data = []
            for user in team_users:
                user_data = {
                    'id': user.id,
                    'name': user.name,
                }
                users_data.append(user_data)

            all_users.extend(users_data)

            return jsonify(all_users)

# Create an instance of the MemberController class
member_controller = MemberController()


