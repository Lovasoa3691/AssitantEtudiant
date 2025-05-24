from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Utilisateur(db.Model):
    __tablename__ = 'Utilisateur'
    id_ut = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(20), nullable=False)
    prenom = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    mdp = db.Column(db.String(255), nullable=False)

    plannings = db.relationship('Planning', backref='utilisateur')
    revisions = db.relationship('Revision', backref='utilisateur')
    messages = db.relationship('AssistantIA', backref='utilisateur')


class Planning(db.Model):
    __tablename__ = 'Planning'
    id_plan = db.Column(db.Integer, primary_key=True)
    utilisateur_id_ut = db.Column(db.Integer, db.ForeignKey('Utilisateur.id_ut'), nullable=False)
    date_plan = db.Column(db.Date, nullable=False)
    heure_deb_plan = db.Column(db.Time, nullable=False)
    heure_fin_plan = db.Column(db.Time, nullable=False)
    titre = db.Column(db.String(255), nullable=False)
    status_plan = db.Column(db.String(255), nullable=False)


class Revision(db.Model):
    __tablename__ = 'Revision'
    id_rev = db.Column(db.Integer, primary_key=True)
    utilisateur_id_ut = db.Column(db.Integer, db.ForeignKey('Utilisateur.id_ut'), nullable=False)
    date_rev = db.Column(db.Date, nullable=False)
    sujet = db.Column(db.String(20), nullable=False)
    heure_deb = db.Column(db.Time, nullable=False)
    heure_fin = db.Column(db.Time, nullable=False)
    status_rev = db.Column(db.String(15), nullable=False)

    historiques = db.relationship('Historique', backref='revision')


class Historique(db.Model):
    __tablename__ = 'Historique'
    id_histo = db.Column(db.Integer, primary_key=True)
    revision_id_rev = db.Column(db.Integer, db.ForeignKey('Revision.id_rev'), nullable=False)
    date_histo = db.Column(db.Date, nullable=False)
    duree_histo = db.Column(db.Integer, nullable=False)


class AssistantIA(db.Model):
    __tablename__ = 'Assistant_IA'
    id = db.Column(db.Integer, primary_key=True)
    utilisateur_id_ut = db.Column(db.Integer, db.ForeignKey('Utilisateur.id_ut'), nullable=False)
    message = db.Column(db.String(100), nullable=False)
    reponse = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)
