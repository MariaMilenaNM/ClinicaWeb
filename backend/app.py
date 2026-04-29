from flask import Flask
from flask_cors import CORS
from crudpy.crudPaciente import paciente_bp
from crudpy.crudProfissional import profissional_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(paciente_bp, url_prefix='/pacientes')
app.register_blueprint(profissional_bp, url_prefix='/profissionais')

if __name__ == '__main__':
    app.run(debug=True, port=5000)