import base64, re, io, cv2
from PIL import Image
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
    img_bytes = io.BytesIO(imgStr)
    img = Image.open(img_bytes)
    imgArray = np.array(img)

    return imgArray

def mergeImage(back, hide):
    result = np.copy(back[:,:,:3])

    bg_w, bg_h = back.shape[:2]
    hd_w, hd_h = hide.shape[:2]
    stepx = bg_w / hd_w
    stepy = bg_h / hd_h

    for i in range(hide.shape[0]):
        for j in range(hide.shape[1]):
            new_x = (int)((i + 0.5) * stepx)
            new_y = (int)((j + 0.5) * stepy)
            result[new_x][new_y] = np.flip(hide[i,j,:3])

    # set verification flag and width & height in alpha channel
    result[0][0] = [14, 5, 114]
    result[0][1] = [255, hd_w % 256, hd_w / 256]
    result[0][2] = [255, hd_h % 256, hd_h / 256]

    return result

def numpyArray2DataUrl(array):
    _, img_encode = cv2.imencode('.png', array)
    dataStr = str(base64.b64encode(img_encode))
    result = 'data:image/png;base64,' + dataStr[2:len(dataStr)-1]

    return result
