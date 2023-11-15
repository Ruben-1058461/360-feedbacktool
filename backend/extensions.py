# Import the Migrate class from the flask_migrate package
from flask_migrate import Migrate
# Import the CORS class from the flask_cors package
from flask_cors import CORS
# Import the SQLAlchemy class from the flask_sqlalchemy package
from flask_sqlalchemy import SQLAlchemy


# Create an instance of the SQLAlchemy class as 'db' for database operations
db = SQLAlchemy()
# Create an instance of the CORS class as 'cors' for handling Cross-Origin Resource Sharing
cors = CORS()
# Create an instance of the Migrate class as 'migrate' for managing database migrations
migrate = Migrate()
