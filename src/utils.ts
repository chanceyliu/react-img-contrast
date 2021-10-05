import { hexReg } from './pattern'
import {
  GetImgDataParams,
  GetImgDataRes
} from './interface'

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
    // 图片添加跨域
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

/**
 * 获取图片信息（像素数组、尺寸）
 * @param params
 * @returns
 */
export const getImgData = async (
  params: GetImgDataParams
): Promise<GetImgDataRes> => {
  const {
    imgSrc,
    xMultiple = 0,
    yMultiple = 0,
    wMultiple = 1,
    hMultiple = 1
  } = params

  const multipleArr = [xMultiple, yMultiple, wMultiple, hMultiple]
  const isVerify = multipleArr.every((item) => item >= 0 && item <= 1)
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
  if (!ctx) {
    throw new Error('Canvas创建失败')
  }
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
  return { data: data, canvasSize: canvasSize }
}

/**
 * 16进制颜色转rgb色值
 * @param hexColor
 * @returns
 */
export const hexToRgb = (hexColor: string): number[] => {
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

/**
 * 将值转化为16进制数
 * @param c r,g,b值
 * @returns
 */
const componentToHex = (c: number) => {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

/**
 * rgb转16进制颜色
 * @param rgbColor
 * @returns
 */
export const rgbToHex = (rgbColor: number[]): string => {
  const [r, g, b] = rgbColor
  if (r > 255 || r < 0 || g > 255 || g < 0 || b > 255 || b < 0) {
    throw new Error('输入合法的rgb值')
  }
  return (
    '#' +
    componentToHex(Number(r)) +
    componentToHex(Number(g)) +
    componentToHex(Number(b))
  )
}
