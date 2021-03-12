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

def mergeImage(back: np.array, hide: np.array) -> str:
    result = np.copy(back)

    bg_w, bg_h = back.shape[:2]
    hd_w, hd_h = hide.shape[:2]
    stepx = bg_w / hd_w
    stepy = bg_h / hd_h

    for i in range(hide.shape[0]):
        for j in range(hide.shape[1]):
            new_x = (int)((i + 0.5) * stepx)
            new_y = (int)((j + 0.5) * stepy)
            result[new_x][new_y] = hide[i][j]

    # set verification flag and width & height in alpha channel
    result[0][3] = 114
    result[1][3] = hd_w / 256
    result[2][3] = hd_w % 256
    result[3][3] = hd_h / 256
    result[4][3] = hd_h % 256

    img_bytes = io.BytesIO(result)
    code = base64.b64encode(img_bytes.read()).decode("utf-8")
    code = "data:image/png;base64," + code + "=="

    return code
