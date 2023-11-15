from __main__ import db, app
# from backend.models.UserTeamModel import UserTeam


# This class represents the User model in the database.
class User(db.Model):
    __tablename__ = 'user'
    # Unique identifier, name, email, password and role for the user
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=True)
    role = db.Column(db.Boolean, nullable=False)

    # Convert the User object to a dictionary representation
    def to_dict(self):
        # user_team = UserTeam.query.filter_by(user_id=self.id).first()
        # team_name = user_team.teams.name if user_team else None

        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'role': self.role,
        }
