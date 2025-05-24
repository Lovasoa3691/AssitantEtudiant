from flask import Blueprint, request, jsonify
from werkzeug.security import  generate_password_hash
from models.models import db, Utilisateur

api_blueprint = Blueprint('api', __name__, url_prefix='/api')

@api_blueprint.route('/users', methods=['GET'])
def get_users():
    utilisateurs = Utilisateur.query.all()
    return jsonify([{
        'id': user.id_ut,
        'nom': user.nom,
        'prenom': user.prenom,
        'email': user.email,
    } for user in utilisateurs])

@api_blueprint.route('/users/<int:id>', methods=['GET'])
def get_user_by_id(id):
    utilisateur = Utilisateur.query.get(id)
    if utilisateur:
        return jsonify({
            'id': utilisateur.id_ut,
            'nom': utilisateur.nom,
            'prenom': utilisateur.prenom,
            'email': utilisateur.email,
        })
    else:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404


@api_blueprint.route('/users', methods=['POST'])
def create_user():
    # data = request.json
    #
    # utilisateur = Utilisateur(
    #     nom=data['nom'],
    #     prenom=data['prenom'],
    #     email=data['email'],
    #     mdp=data['mdp'],
    # )

    utilisateur = Utilisateur(
        nom="fenonantenaiko",
        prenom="lovasoa gilbert julianot",
        email="fenonantenaikolovasoa@gmail.com",
        mdp=generate_password_hash("orion")
    )

    db.session.add(utilisateur)
    db.session.commit()
    return jsonify({'message': 'Utilisateur creer'}), 201

@api_blueprint.route('/users', methods=['PUT'])
def update_user():
    data = request.json
    utilisateur = Utilisateur.query.get(data['id'])
    utilisateur.nom = data['nom']
    utilisateur.prenom = data['prenom']
    utilisateur.email = data['email']
    db.session.commit()
    return jsonify({'message': 'Utilisateur modificer'}), 200

@api_blueprint.route('/users', methods=['DELETE'])
def delete_user():
    data = request.json
    utilisateur = Utilisateur.query.get(data['id'])
    db.session.delete(utilisateur)
    db.session.commit()
    return jsonify({'message': 'Utilisateur eliminer'}), 200
