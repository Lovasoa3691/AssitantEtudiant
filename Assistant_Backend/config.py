import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # SQLALCHEMY_DATABASE_URI = 'mysql://orion:orion3691@localhost/db_assistant'
    # SQLALCHEMY_DATABASE_URI = 'mysql://sql8781008:E4FLPaxM6v@sql8.freesqldatabase.com:3306/sql8781008'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:MsuKGQyeHem8ussq@db.uzyfjnvfdacvsnbwzzno.supabase.co:5432/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
