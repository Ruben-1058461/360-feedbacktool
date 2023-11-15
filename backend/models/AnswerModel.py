from __main__ import db, app
from backend.models.UserModel import User
from backend.models.QuestionModel import Question

class Answer(db.Model):
    __tablename__ = 'answer'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    question_id = db.Column(db.Integer
                            , db.ForeignKey('question.id'))
    text = db.Column(db.String(255), nullable=False)

    # Relationship to access the associated User object
    user = db.relationship('User', backref=db.backref('answers', lazy=True))

    # Relationship to access the associated Question object
    question = db.relationship('Question', backref=db.backref('answers', lazy=True))

    # Convert the Answer object to a dictionary representation
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'question_id': self.question_id,
            'text': self.text,
        }
