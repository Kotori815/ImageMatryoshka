from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

app.jinja_env.auto_reload = True
CORS(app, supports_cresentials=True)

import proj.api