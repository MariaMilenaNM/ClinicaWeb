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

    def to_dict(self):
        return {
            "id":       self.id,
            "nome":     self.nome,
            "data":     self.data,
            "email":    self.email,
            "telefone": self.telefone,
            "cidade":   self.cidade,
            "estado":   self.estado
        }

Base.metadata.create_all(engine)

class PacienteRepository:

    @staticmethod
    def buscar_por_email(email):
        try:
            return session.query(Paciente).filter_by(email=email).first()
        except Exception as e:
            print(f"Erro ao buscar paciente por email: {e}")
            return None

    @staticmethod
    def buscar_por_email_e_senha(email, senha):
        try:
            return session.query(Paciente).filter_by(email=email, senha=senha).first()
        except Exception as e:
            print(f"Erro ao buscar paciente por email e senha: {e}")
            return None

    @staticmethod
    def buscar_por_id(paciente_id):
        try:
            return session.query(Paciente).filter_by(id=paciente_id).first()
        except Exception as e:
            print(f"Erro ao buscar paciente {paciente_id}: {e}")
            return None

    @staticmethod
    def criar(dados):
        try:
            novo_paciente = Paciente(
                nome=dados.get('nome'),
                data=dados.get('data'),
                email=dados.get('email'),
                telefone=dados.get('telefone'),
                cidade=dados.get('cidade'),
                estado=dados.get('estado'),
                senha=dados.get('senha')
            )
            session.add(novo_paciente)
            session.commit()
            return novo_paciente
        except Exception as e:
            session.rollback()
            print(f"Erro ao criar paciente: {e}")
            return None

    @staticmethod
    def atualizar(paciente_id, dados_novos):
        try:
            paciente = session.query(Paciente).filter_by(id=paciente_id).first()

            if paciente:
                if 'nome'     in dados_novos: paciente.nome     = dados_novos['nome']
                if 'telefone' in dados_novos: paciente.telefone = dados_novos['telefone']
                if 'cidade'   in dados_novos: paciente.cidade   = dados_novos['cidade']
                if 'estado'   in dados_novos: paciente.estado   = dados_novos['estado']

                session.commit()
                return paciente
            return None
        except Exception as e:
            session.rollback()
            print(f"Erro ao atualizar paciente {paciente_id}: {e}")
            return None