import { hexReg } from '.'
import { GetImgColorParams } from './interface'

/**
 * 创建一个Img标签
 * @param url 图片地址
 * @returns
 */
export const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

/**
 * 生成rgb色值对应的YIQ值，并返回文字颜色
 * @param r
 * @param g
 * @param b
 * @returns 黑或白
 */
export const getContrastYIQ = (r: number, g: number, b: number) => {
  // w3c上提供的计算颜色明亮度的算法
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  // 以中性灰（即值为128）为判断，高于128则认为图片偏白，则以黑色显示文字，反之则为白色显示文字
  return yiq >= 128 ? 'black' : 'white'
}

/**
 * 生成图片的平均色值
 * @param data
 * @returns
 */
export const getImgContrast = async (
  data: GetImgColorParams
): Promise<number[]> => {
  const {
    imgSrc,
    xMultiple = 0,
    yMultiple = 0,
    wMultiple = 1,
    hMultiple = 1
  } = data

  const multipleArr = [xMultiple, yMultiple, wMultiple, hMultiple]
  const isVerify = multipleArr.every(item => item >= 0 && item <= 1)
  if (!isVerify) {
    throw new Error('请输入合法的比例系数，即大于0小于1的数字')
  }

  const myCanvas = document.createElement('canvas')
  const bgImg = await createImage(imgSrc)

  const iHeight = bgImg.height
  const iWidth = bgImg.width
  const canvasWidth = iWidth * wMultiple
  const canvasHeight = iHeight * hMultiple
  const canvasSize = canvasWidth * canvasHeight

  myCanvas.width = iWidth * wMultiple
  myCanvas.height = iHeight * hMultiple

  const ctx = myCanvas.getContext('2d')
  if (ctx) {
    ctx.drawImage(
      bgImg,
      iWidth * xMultiple,
      iHeight * yMultiple,
      canvasWidth,
      canvasHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    )

    // 获取canvas中图像的像素数据
    const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data
    let r = 0
    let g = 0
    let b = 0

    // 取所有像素的平均值
    for (let col = 0; col < canvasWidth; col++) {
      for (let row = 0; row < canvasHeight; row++) {
        r += data[canvasWidth * row + col * 4]
        g += data[canvasWidth * row + col * 4 + 1]
        b += data[canvasWidth * row + col * 4 + 2]
      }
    }

    // 求取平均值
    r = Math.round(r / canvasSize)
    g = Math.round(g / canvasSize)
    b = Math.round(b / canvasSize)

    return [r, g, b]
  }
  return [0, 0, 0]
}

/**
 * 16进制颜色转rgb色值
 * @param hexColor
 * @returns
 */
export const hexToRgb = (hexColor: string):number[] => {
  // 把颜色值变成小写
  let color = hexColor.toLowerCase()
  if (hexReg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#efe => #eeffee
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    const colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return colorChange
  } else {
    throw new Error('请输入十六进制颜色')
  }
}
