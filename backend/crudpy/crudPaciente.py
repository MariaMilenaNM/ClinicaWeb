from flask import Blueprint, request, jsonify
from sqlalchemy import *
from sqlalchemy.orm import *

Base = declarative_base()

engine = create_engine("sqlite:///clinica.db")
Session = sessionmaker(bind=engine)
session = Session()

class Paciente(Base):
    __tablename__ = "pacientes"

    id       = Column(Integer, primary_key=True)
    nome     = Column(String)
    data     = Column(String)
    email    = Column(String)
    telefone = Column(String)
    cidade   = Column(String)
    estado   = Column(String)
    senha    = Column(String)

Base.metadata.create_all(engine)

paciente_bp = Blueprint('paciente', __name__)

@paciente_bp.route('/cadastrar', methods=['POST'])
def cadastrar():
    dados = request.json
    email = dados.get('email')

    if session.query(Paciente).filter_by(email=email).first():
        return jsonify({'status': 'duplicado'}), 409

    novo_paciente = Paciente(
        nome=dados.get('nome'),
        data=dados.get('data'),
        email=email,
        telefone=dados.get('telefone'),
        cidade=dados.get('cidade'),
        estado=dados.get('estado'),
        senha=dados.get('senha')
    )

    session.add(novo_paciente)
    session.commit()

    return jsonify({'status': 'ok'}), 201

@paciente_bp.route('/login', methods=['POST'])
def login():
    dados = request.json
    email = dados.get('email')
    senha = dados.get('senha')

    paciente = session.query(Paciente).filter_by(email=email, senha=senha).first()

    if paciente:
        p_seguro = {
            'id': paciente.id,
            'nome': paciente.nome,
            'data': paciente.data,
            'email': paciente.email,
            'telefone': paciente.telefone,
            'cidade': paciente.cidade,
            'estado': paciente.estado
        }
        return jsonify(p_seguro), 200

    return jsonify({'erro': 'Não encontrado'}), 404

@paciente_bp.route('/<int:id>', methods=['GET'])
def buscar(id):
    p = session.query(Paciente).filter_by(id=id).first()
    if not p:
        return jsonify({'erro': 'Paciente não encontrado'}), 404

    return jsonify({
        'id':       p.id,
        'nome':     p.nome,
        'data':     p.data,
        'email':    p.email,
        'telefone': p.telefone,
        'cidade':   p.cidade,
        'estado':   p.estado
    }), 200

@paciente_bp.route('/<int:id>', methods=['PUT'])
def atualizar(id):
    dados = request.json
    p = session.query(Paciente).filter_by(id=id).first()
    if not p:
        return jsonify({'erro': 'Paciente não encontrado'}), 404

    if 'nome'     in dados: p.nome     = dados['nome']
    if 'telefone' in dados: p.telefone = dados['telefone']
    if 'cidade'   in dados: p.cidade   = dados['cidade']
    if 'estado'   in dados: p.estado   = dados['estado']

    session.commit()
    return jsonify({'status': 'atualizado'}), 200