from flask import Blueprint, request, jsonify

paciente_bp = Blueprint('paciente', __name__)

pacientes = []

@paciente_bp.route('/cadastrar', methods=['POST'])
def cadastrar():
    dados = request.json
    email = dados.get('email')
    
    if any(p['email'] == email for p in pacientes):
        return jsonify({'status': 'duplicado'}), 409
    
    pacientes.append(dados)
    return jsonify({'status': 'ok'}), 201

@paciente_bp.route('/login', methods=['POST'])
def login():
    dados = request.json
    email = dados.get('email')
    senha = dados.get('senha')
    
    paciente = next((p for p in pacientes if p['email'] == email and p['senha'] == senha), None)
    
    if paciente:
        p_seguro = {k: v for k, v in paciente.items() if k != 'senha'}
        return jsonify(p_seguro), 200
    return jsonify({'erro': 'Não encontrado'}), 404