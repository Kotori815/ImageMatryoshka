import os

from flask import Flask, request, jsonify, render_template
from flask_cors import *
import base64, re, os, uuid

import util

app = Flask(__name__)
CORS(app, supports_cresentials=True)

@app.route('/')
def hello():
    # return '<h1>Void Page!</h1><p>There is a void in your heart and I put it there</p>'
    return render_template('encode.html')


@app.route('/upload', methods=['POST'])
def upload():
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
    

