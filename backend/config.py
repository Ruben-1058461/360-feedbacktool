# Import the os module for operating system-related functionalities
import os


# Configuration class for the Flask application.
class Config:

    # IP address on which the Flask application will be served
    FLASK_IP = "0.0.0.0"
    # Port on which the Flask application will listen
    FLASK_PORT = 5000
    # Enable debug mode for the Flask application
    FLASK_DEBUG = True
    # Get the absolute path of the directory containing this configuration file
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    # URI for connecting to the SQLite database
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'database/feedback.sqlite')
    # Disable modification tracking for SQLAlchemy
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Prefix for member-related API endpoints
    members_api_prefix = "/api/members"
    # Prefix for team-related API endpoints
    teams_api_prefix = "/api/teams"
    # Prefix for question-related API endpoints
    questions_api_prefix = "/api/questions"
    # Prefix for survey-related API endpoints
    surveys_api_prefix = "/api/surveys"
    # Prefix for survey-related API endpoints
    answers_api_prefix = "/api/answers"
    # Prefix for user-related API endpoints
    users_api_prefix = "/api/users"
