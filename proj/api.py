import os
from flask import Flask, request, jsonify, render_template
import base64, re, os, uuid

from proj import app
import proj.encode as enc
import proj.decode as dec

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
    return render_template('welcome.html')

@app.route('/encodePage')
def encodePage():
    return render_template('encode.html')

@app.route('/decodePage')
def decodePage():
    return render_template('decode.html')

@app.route('/encode', methods=['POST'])
def encode():
    try:
        if not request.json:
            return jsonify({'code': -1, 'message': 'request is not json'})
        
        param = request.json
        dataUrlRes = enc.encode(param.get('back'), param.get('hide'))

        return jsonify({'code': 0, 
                        'message': 'images are merged successfully', 
                        'result': dataUrlRes})
        
    except Exception as e:
        print(e.args)
        return jsonify({'code': -1, 'message': e.args})


@app.route('/decode', methods=['POST'])
def decode():
    try:
        if not request.json:
            return jsonify({'code': -1, 'message': 'request is not json'})
        
        param = request.json
        dataUrlRes = dec.decode(param.get('result'))

        return jsonify({'code': 0, 
                        'message': 'images are merged successfully', 
                        'result': dataUrlRes})
        
    except Exception as e:
        print(e.args)
        return jsonify({'code': -1, 'message': e.args})

