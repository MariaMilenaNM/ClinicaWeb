from flask import Blueprint, request, jsonify

profissional_bp = Blueprint('profissional', __name__)

profissionais = []

@profissional_bp.route('', methods=['GET'])
def listar():
    return jsonify(profissionais), 200

@profissional_bp.route('', methods=['POST'])
def criar():
    dados = request.json
    novo_id = max([p['id'] for p in profissionais], default=-1) + 1
    novo_prof = {'id': novo_id, **dados}
    profissionais.append(novo_prof)
    return jsonify(novo_prof), 201

@profissional_bp.route('/<int:id>', methods=['GET'])
def buscar(id):
    p = next((obj for obj in profissionais if obj['id'] == id), None)
    return jsonify(p) if p else (jsonify({'erro': '404'}), 404)

@profissional_bp.route('/<int:id>', methods=['PUT'])
def atualizar(id):
    dados_novos = request.json
    for p in profissionais:
        if p['id'] == id:
            p.update(dados_novos)
            p['id'] = id
            return jsonify(p), 200
    return jsonify({'erro': '404'}), 404

@profissional_bp.route('/<int:id>', methods=['DELETE'])
def deletar(id):
    global profissionais
    profissionais = [p for p in profissionais if p['id'] != id]
    return jsonify({'status': 'removido'}), 200