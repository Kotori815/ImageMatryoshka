import proj.util as util
import numpy as np

def decode(result):
    imgRes = util.dataUrl2NumpyArray(result)
    imgOri = extractImage(imgRes)
    dataUrlStr = util.numpyArray2DataUrl(imgOri)
    return dataUrlStr

def extractImage(result):
    bg_w, bg_h, hd_w, hd_h = authen(result)
    stepx = bg_w / hd_w
    stepy = bg_h / hd_h

    origin = np.zeros([hd_w, hd_h, 3])
    
    for i in range(hd_w):
        for j in range(hd_h):
            new_x = (int)((i + 0.5) * stepx)
            new_y = (int)((j + 0.5) * stepy)
            origin[i,j] = result[new_x, new_y]
    
    return origin

def authen(result):
    if all(result[0,0] != [114, 5, 14]):
        Exception("Unable to read")
    bg_w = result[0,1,0] * 256 + result[0,1,1]
    bg_h = result[0,2,0] * 256 + result[0,2,1]
    hd_w = result[0,3,0] * 256 + result[0,3,1]
    hd_h = result[0,4,0] * 256 + result[0,4,1]
    print(bg_w, bg_h, hd_w, hd_h)
    return bg_w, bg_h, hd_w, hd_h