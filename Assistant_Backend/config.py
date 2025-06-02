import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # SQLALCHEMY_DATABASE_URI = 'mysql://orion:orion3691@localhost/db_assistant'
    # SQLALCHEMY_DATABASE_URI = 'mysql://sql8781008:E4FLPaxM6v@sql8.freesqldatabase.com:3306/sql8781008'
    SQLALCHEMY_DATABASE_URI = 'postgresql://neondb_owner:npg_BHgmSX1Qxn9M@ep-long-boat-a27ai8pg-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
