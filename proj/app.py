import os

from flask import Flask, request, jsonify
from flask_cors import *
import base64, re, os, uuid

from util import *

app = Flask(__name__)
CORS(app, supports_cresentials=True)

backImg, hideImg = None, None

@app.route('/')
def hello():
    return '<h1>Void Page!</h1><p>There is a void in your heart and I put it there</p>'

@app.route('/upload', methods=['POST'])
def upload():
    try:
        if not request.json:
            return jsonify({'code': -1, 'message': 'request is not json'})
        
        param = request.json
        img = readBase64Data(param.get('img'))
        print(img.shape)

        typeImg = param.get('type')
        if typeImg == 'back':
            backImg = img
            print('read back')
        elif typeImg == 'hide':
            hideImg = img
            print('read hide')
        else:
            Exception('undefined type'.format(typeImg))

        return jsonify({'code': 0, 'message': '{}-image upload successfully'.format(typeImg)})
        
    except Exception as e:
        print(e.args)
        return jsonify({'code': -1, 'message': e.args[0]})

@app.route('/merge')
def merge():
    if not backImg or not hideImg:
        return jsonify({'code': -1, 'message': 'Either image not uploaded'})
    

