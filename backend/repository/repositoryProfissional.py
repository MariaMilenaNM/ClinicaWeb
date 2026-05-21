from sqlalchemy import *
from sqlalchemy.orm import *

Base = declarative_base()

engine = create_engine("sqlite:///profissionais.db")
Session = sessionmaker(bind=engine)
session = Session()


class Profissional(Base):
    __tablename__ = "profissionais"
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    crp = Column(String)
    modalidade = Column(String)
    link = Column(String)
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

Base.metadata.create_all(engine)

class ProfissionalRepository:
    
    @staticmethod
    def listar_todos():
        try:
            return session.query(Profissional).order_by(Profissional.id).all()
        except Exception as e:
            print(f"Erro ao listar profissionais: {e}")
            return []
        
    @staticmethod
    def buscar_por_id(profissional_id):
        try:
            return session.query(Profissional).filter_by(id=profissional_id).first()
        except Exception as e:
            print(f"Erro ao buscar profissional {profissional_id}: {e}")
            return None

    @staticmethod
    def criar(dados):
        try:
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
            return novo_prof
        except Exception as e:
            session.rollback()  # Desfaz a operação se der erro (vi olha como bota o rollback)
            print(f"Erro ao criar profissional: {e}")
            return None

    @staticmethod
    def atualizar(profissional_id, dados_novos):
        try:
            profissional = session.query(Profissional).filter_by(id=profissional_id).first()
            
            if profissional:
                if 'nome' in dados_novos: profissional.nome = dados_novos['nome']
                if 'crp' in dados_novos: profissional.crp = dados_novos['crp']
                if 'modalidade' in dados_novos: profissional.modalidade = dados_novos['modalidade']
                if 'link' in dados_novos: profissional.link = dados_novos['link']
                if 'numero' in dados_novos: profissional.numero = dados_novos['numero']
                if 'contato' in dados_novos: profissional.contato = dados_novos['contato']
                
                session.commit()
                return profissional
            return None
        except Exception as e:
            session.rollback()  # Desfaz a operação se der erro
            print(f"Erro ao atualizar profissional {profissional_id}: {e}")
            return None

    @staticmethod
    def deletar(profissional_id):
        try:
            profissional = session.query(Profissional).filter_by(id=profissional_id).first()
            if profissional:
                session.delete(profissional)
                session.commit()
                return True
            return False
        except Exception as e:
            session.rollback()  # Desfaz a operação se der erro
            print(f"Erro ao deletar profissional {profissional_id}: {e}")
            return False