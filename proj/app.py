import os

from flask import Flask, request, jsonify
from flask_cors import *
import base64, re

app = Flask(__name__)
CORS(app, supports_cresentials=True)

backImg = None
hideImg = None

# a simple page that says hello
@app.route('/')
def hello():
    return '<h1>Void Page!</h1><p>There is a void in your heart and I put it there</p>'

@app.route('/upload', methods=['POST'])
def upload():
    try:
        if not request.json:
            return jsonify({'code': -1, 'message': 'request is not json'})
        
        param = request.json
        img = readData(param.get('img'))

        typeImg = param.get('type')
        if typeImg == "back":
            backImg = img
            print("read back")
        elif typeImg == "hide":
            hideImg = img
            print("read hide")
        else:
            Exception("这图哪里来的？？？")

        return jsonify({'code': 0, 'message': 'upload successfully'})
        
    except Exception as e:
        print(e.args)
        return jsonify({'code': -1, 'error_message':e})
    
def readData(src):
    result = re.search('data:image/(?P<ext>.*?);base64,(?P<data>.*)', src, re.DOTALL)

    if not result:
        raise Exception('上传失败')
    if result.groupdict().get('ext') != 'png':
        raise Exception('图片应为png格式！')
    
    data = result.groupdict().get('data')
    img = base64.urlsafe_b64decode(data)

    return img
    


    