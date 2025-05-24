import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql://orion:orion3691@localhost/db_assistant'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
