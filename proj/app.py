import os

from flask import Flask, request, jsonify, render_template
from flask_cors import *
import base64, re, os, uuid

import util

app = Flask(__name__)
app.config["DEBUG"] = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1
app.jinja_env.auto_reload = True
CORS(app, supports_cresentials=True)

def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    filename = None
    if endpoint == 'static':
        filename = values.get('filename', None)
    if filename:
        file_path = os.path.join(app.root_path, endpoint, filename)
        values['v'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

@app.route('/')
def main():
    # return '<h1>Void Page!</h1><p>There is a void in your heart and I put it there</p>'
    return render_template('encode.html')


@app.route('/encode', methods=['POST'])
def encode():
    try:
        if not request.json:
            print("aa")
            return jsonify({'code': -1, 'message': 'request is not json'})
        
        param = request.json

        imgBack = util.dataUrl2NumpyArray(param.get('back'))
        imgHide = util.dataUrl2NumpyArray(param.get('hide'))
        
        imgRes = util.mergeImage(imgBack, imgHide)
        dataUrlRes = util.numpyArray2DataUrl(imgRes)

        return jsonify({'code': 0, 
                        'message': 'images are merged successfully', 
                        'result': dataUrlRes})
        
    except Exception as e:
        print(e.args)
        return jsonify({'code': -1, 'message': e.args})


