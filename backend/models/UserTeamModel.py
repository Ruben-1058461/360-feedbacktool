from __main__ import db
from backend.models.TeamModel import Team
from backend.models.UserModel import User

# This class represents the UserTeam pivot model in the database.
class UserTeam(db.Model):
    # Unique identifier for the user-team relationship
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key referencing the User model
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # Foreign key referencing the Team model
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'))

    # Relationship to access the associated User object
    users = db.relationship('User', backref=db.backref('users', lazy=True))
    # Relationship to access the associated Team object
    teams = db.relationship('Team', backref=db.backref('users_teams', lazy=True))

    # Convert the UserTeam object to a dictionary representation
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'team_id': self.team_id,
        }
