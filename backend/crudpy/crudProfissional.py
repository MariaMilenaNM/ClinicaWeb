from flask import Blueprint, request, jsonify

from repository.repositoryProfissional import ProfissionalRepository

profissional_bp = Blueprint('profissional', __name__)

@profissional_bp.route('', methods=['GET'])
def listar():
    result = ProfissionalRepository.listar_todos()
    profissionais_dict = [profissional.to_dict() for profissional in result]
    return jsonify(profissionais_dict), 200

@profissional_bp.route('', methods=['POST'])
def criar():
    dados = request.json
    novo_prof = ProfissionalRepository.criar(dados)
    return jsonify(novo_prof.to_dict()), 201

@profissional_bp.route('/<int:id>', methods=['GET'])
def buscar(id):
    p = ProfissionalRepository.buscar_por_id(id)
    return jsonify(p.to_dict()) if p else (jsonify({'erro': '404'}), 404)

@profissional_bp.route('/<int:id>', methods=['PUT'])
def atualizar(id):
    dados_novos = request.json
    profissional_atualizado = ProfissionalRepository.atualizar(id, dados_novos)
    
    if profissional_atualizado:
        return jsonify(profissional_atualizado.to_dict()), 200
    return jsonify({'erro': '404'}), 404

@profissional_bp.route('/<int:id>', methods=['DELETE'])
def deletar(id):
    sucesso = ProfissionalRepository.deletar(id)
    if sucesso:
        return jsonify({'status': 'removido'}), 200
    return jsonify({'erro': '404'}), 404