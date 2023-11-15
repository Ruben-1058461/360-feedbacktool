from flask import Flask
from extensions import migrate, db
from config import Config
from flask_cors import CORS
from flask_mail import Mail
# from dotenv import load_dotenv
import os

# load_dotenv()


app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app)

#Flask-Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL')
mail = Mail(app)

# Initialize the CORS extension and database extension for the Flask application
db.init_app(app)
migrate.init_app(app, db)
CORS(app)

# Secret key for the session
app.secret_key = '1335eb3948fb7b64a029aa29'


# Shell context processor for Flask shell
@app.shell_context_processor
def make_shell_context():
    return dict(app=app, db=db)


# Main entry point of the application
if __name__ == "__main__":
    # Import the necessary models and routes
    # from models.TeamModel import Team
    # from models.UserModel import User
    # from models.SurveyTeamModel import SurveyTeam
    # from models.AnswerModel import Answer
    # from models.SurveyModel import Survey
    # from models.QuestionModel import Question
    # from models.UserTeamModel import UserTeam

    with app.app_context():
        # Apply any necessary database migrations
        # db.drop_all()
        db.create_all()

    # Import the member_api blueprint and team_api blueprint from the routes package
    from routes.MemberRoutes import member_api
    from routes.SurveyRoutes import survey_api
    from routes.TeamRoutes import team_api
    from routes.QuestionRoutes import question_api
    from routes.AnswerRoutes import answer_api
    from routes.UserRoutes import user_api

    # Register the blueprints
    blueprint_name = [member_api, survey_api, team_api, question_api, user_api, answer_api]
    for name in blueprint_name:
        app.register_blueprint(name)

    # Run the Flask application on the specified host, port, and with debug mode enabled or disabled
    app.run(host=Config.FLASK_IP, port=Config.FLASK_PORT, debug=Config.FLASK_DEBUG)
