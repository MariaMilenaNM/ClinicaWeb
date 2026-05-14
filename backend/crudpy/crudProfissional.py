from flask import Blueprint, request, jsonify
from sqlalchemy import *
from sqlalchemy.orm import *

profissional_bp = Blueprint('profissional', __name__)

Base = declarative_base()

# conexão com PostgreSQL
engine = create_engine(
     "sqlite:///profissionais.db"
)

Session = sessionmaker(bind=engine)
session = Session()

class Profissional(Base):
    __tablename__ = "profissionais"
    id = Column (Integer, primary_key=True)
    nome = Column(String)
    crp = Column (String)
    modalidade = Column (String)
    link = Column (String)
    numero = Column(String)
    contato = Column(String)

    def to_dict(self):
            return {
                "id": self.id,
                "nome": self.nome,
                "crp": self.crp,
                "modalidade": self.modalidade,
                "link": self.link,
                "numero": self.numero,
                "contato": self.contato
            }

#profissionais = []

Base.metadata.create_all(engine)

@profissional_bp.route('', methods=['GET'])
def listar():

    result = session.query(Profissional).order_by(Profissional.id).all()

    profissionais_dict = [profissional.to_dict() for profissional in result]
        
    return jsonify(profissionais_dict), 200

@profissional_bp.route('', methods=['POST'])
def criar():
    dados=request.json

    novo_prof = Profissional(
        nome=dados.get('nome'),
        crp=dados.get('crp'),
        modalidade=dados.get('modalidade'),
        link=dados.get('link'),
        numero=dados.get('numero'),
        contato=dados.get('contato')
    )
   
    session.add(novo_prof)
    session.commit()

    return jsonify(novo_prof.to_dict()), 201

@profissional_bp.route('/<int:id>', methods=['GET'])
def buscar(id):
    p = session.query(Profissional).filter_by(id=id).first()
    return jsonify(p.to_dict()) if p else (jsonify({'erro': '404'}), 404)

@profissional_bp.route('/<int:id>', methods=['PUT'])
def atualizar(id):
    dados_novos = request.json

    profissionais = session.query(Profissional).filter_by(id=id).first()

    if profissionais:
        if 'nome' in dados_novos: 
            profissionais.nome = dados_novos['nome']
        if 'crp' in dados_novos: 
            profissionais.crp = dados_novos['crp']
        if 'modalidade' in dados_novos: 
            profissionais.modalidade = dados_novos['modalidade']
        if 'link' in dados_novos: 
            profissionais.link = dados_novos['link']
        if 'numero' in dados_novos:
            profissionais.numero = dados_novos['numero']
        if 'contato' in dados_novos: 
            profissionais.contato = dados_novos['contato']
        session.commit()
        return jsonify(profissionais.to_dict()), 200

    return jsonify({'erro': '404'}), 404

#    dados_novos = request.json
#    for p in profissionais:
#        if p['id'] == id:
#           p.update(dados_novos)
#            p['id'] = id
#            return jsonify(p), 200
#   return jsonify({'erro': '404'}), 404

@profissional_bp.route('/<int:id>', methods=['DELETE'])
def deletar(id):
    profissional = session.query(Profissional).filter_by(id=id).first()

    if profissional:
        session.delete(profissional)
        session.commit()
        return jsonify({'status': 'removido'}), 200
    return jsonify({'erro':'404'}), 404