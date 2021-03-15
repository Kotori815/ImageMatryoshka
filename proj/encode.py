import proj.util as util
import numpy as np

def encode(back, hide):
    imgBack = util.dataUrl2NumpyArray(back)
    imgHide = util.dataUrl2NumpyArray(hide)
    imgRes = mergeImage(imgBack, imgHide)
    dataUrlRes = util.numpyArray2DataUrl(imgRes)
    return dataUrlRes

def mergeImage(back, hide):
    result = np.copy(back)

    bg_w, bg_h = back.shape[:2]
    hd_w, hd_h = hide.shape[:2]
    stepx = bg_w / hd_w
    stepy = bg_h / hd_h

    for i in range(hide.shape[0]):
        for j in range(hide.shape[1]):
            new_x = (int)((i + 0.5) * stepx)
            new_y = (int)((j + 0.5) * stepy)
            result[new_x,new_y] = hide[i,j]

    # set verification flag and width & height in starting pixels
    encrypt(result, bg_w, bg_h, hd_w, hd_h)

    return result

def encrypt(result, bg_w, bg_h, hd_w, hd_h):
    print(bg_w, bg_h, hd_w, hd_h)
    result[0,0] = [114, 5, 14]
    result[0,1] = [bg_w / 256, bg_w % 256, 255]
    result[0,2] = [bg_h / 256, bg_h % 256, 255]
    result[0,3] = [hd_w / 256, hd_w % 256, 255]
    result[0,4] = [hd_h / 256, hd_h % 256, 255]
