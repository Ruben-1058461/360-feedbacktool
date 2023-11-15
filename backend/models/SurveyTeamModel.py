from __main__ import db, app


# Define the pivot table model
class SurveyTeam(db.Model):
    survey_id = db.Column(db.Integer, db.ForeignKey('survey.id'), primary_key=True)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'), primary_key=True)

    teams = db.relationship('Team', backref=db.backref('teams', lazy=True))

    def to_dict(self):
        return {
            'survey_id': self.survey_id,
            'team_id': self.team_id
        }
