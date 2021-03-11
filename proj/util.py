import base64, re, io
from PIL import Image
import numpy as np

# extract data from dataurl(src) and transfer into numpy array
def readBase64Data(src: str) -> np.array:
    result = re.search('data:image/(?P<ext>.*?);base64,(?P<data>.*)', src, re.DOTALL)

    if not result:
        raise Exception('数据格式有误')
    if result.groupdict().get('ext') != 'png':
        raise Exception('图片应为png格式！')
    
    data = result.groupdict().get('data')
    imgStr = base64.b64decode(data)
    img_bytes = io.BytesIO(imgStr)
    img = Image.open(img_bytes)
    imgArray = np.array(img)

    return imgArray

def mergeImage(back, hide):
    pass