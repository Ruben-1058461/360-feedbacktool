from __main__ import db, app
from backend.models.SurveyModel import Survey


# This class represents the Question model in the database.
class Question(db.Model):
    __tablename__ = 'question'
    # Unique identifier, question text, question type (multiple choice or open)
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Boolean, nullable=False)
    options = db.Column(db.String(255), nullable=False)
    survey_id = db.Column(db.Integer, db.ForeignKey('survey.id'))

    # Relationship to access the associated Surveys object
    surveys = db.relationship('Survey', backref=db.backref('surveys', lazy=True))

    # Convert the Question object to a dictionary representation
    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'type': self.type,
            'options': self.options,
            'survey_id': self.survey_id,
        }
