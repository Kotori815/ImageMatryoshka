import base64, re, io, cv2
import numpy as np

# extract data from dataurl(src) and transfer into numpy array
def dataUrl2NumpyArray(src):
    result = re.search('data:image/(?P<ext>.*?);base64,(?P<data>.*)', src, re.DOTALL)
    if not result:
        raise Exception('数据格式有误')
    if result.groupdict().get('ext') != 'png':
        raise Exception('图片应为png格式！')
    
    data = result.groupdict().get('data')
    imgStr = base64.b64decode(data)
    nparr = np.frombuffer(imgStr, dtype=np.uint8)
    imgArray = cv2.imdecode(nparr, flags=cv2.IMREAD_COLOR)

    return imgArray

# transfer arrya into dataurl for png
def numpyArray2DataUrl(array):
    _, img_encode = cv2.imencode('.png', array)
    dataStr = str(base64.b64encode(img_encode))
    result = 'data:image/png;base64,' + dataStr[2:len(dataStr)-1]

    return result