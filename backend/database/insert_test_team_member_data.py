import sqlite3
from faker import Faker
import random
import os

fake = Faker()

# Define the path to the database file
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_URI = os.path.join(BASE_DIR, 'feedback.sqlite')

# Create a connection to the SQLite database
conn = sqlite3.connect(DATABASE_URI)
cursor = conn.cursor()

# Create a list of team IDs to select from (1 to 5)
team_ids = [1, 2, 3, 4, 5]
departments = ["DIRECTIE", "ICT", "FINANCE", "HRM", "LOGISTICS"]

# Generate 50 random team member records
for i in range(50):
    # Insert the new team member into the "user" table
    cursor.execute("""
        INSERT INTO user (id, name, email, password, role)
        VALUES (NULL, ?, ?, ?, ?)
    """, (fake.name(), fake.email(), fake.password(), random.choice([True, False])))

    # Get the last inserted row ID (user ID)
    user_id = cursor.lastrowid

    # Select a random team ID
    team_id = random.choice(team_ids)

    # Create a new UserTeam object and insert it into the "user_team" table
    cursor.execute("""
        INSERT INTO user_team (user_id, team_id)
        VALUES (?, ?)
    """, (user_id, team_id))

# Insert departments into the "team" table
for department in departments:
    cursor.execute("""
        INSERT INTO team (name)
        VALUES (?)
    """, (department,))

# Commit the changes and close the connection
conn.commit()
conn.close()
