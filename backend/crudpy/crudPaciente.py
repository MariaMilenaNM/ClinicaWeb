from flask import Blueprint, request, jsonify
from repository.repositoryPaciente import PacienteRepository

paciente_bp = Blueprint('paciente', __name__)


@paciente_bp.route('/cadastrar', methods=['POST'])
def cadastrar():
    dados = request.json
    email = dados.get('email')

    if PacienteRepository.buscar_por_email(email):
        return jsonify({'status': 'duplicado'}), 409

    novo_paciente = PacienteRepository.criar(dados)
    return jsonify(novo_paciente.to_dict()), 201


@paciente_bp.route('/login', methods=['POST'])
def login():
    dados = request.json
    email = dados.get('email')
    senha = dados.get('senha')

    paciente = PacienteRepository.buscar_por_email_e_senha(email, senha)

    if paciente:
        return jsonify(paciente.to_dict()), 200

    return jsonify({'erro': 'Não encontrado'}), 404


@paciente_bp.route('/<int:id>', methods=['GET'])
def buscar(id):
    p = PacienteRepository.buscar_por_id(id)
    return jsonify(p.to_dict()) if p else (jsonify({'erro': 'Paciente não encontrado'}), 404)


@paciente_bp.route('/<int:id>', methods=['PUT'])
def atualizar(id):
    dados = request.json
    p = PacienteRepository.atualizar(id, dados)

    if p:
        return jsonify(p.to_dict()), 200
    return jsonify({'erro': 'Paciente não encontrado'}), 404