import { hexToRgb, getImgData } from '../utils'
import { GetImgDataParams, GetImgDataRes } from '../interface'

/**
 * 生成rgb色值对应的YIQ值，并返回文字颜色
 * @param r
 * @param g
 * @param b
 * @returns 黑或白
 */
export const getContrastYIQ = (r: number, g: number, b: number) => {
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  // 以中性灰（即值为128）为判断，高于128则认为图片偏白，则以黑色显示文字，反之则为白色显示文字
  return yiq >= 128 ? 'black' : 'white'
}

/**
 * 获取图片平均色值
 * @param params
 * @returns
 */
export const getAverageColor = (params: GetImgDataRes): number[] => {
  const { data, canvasSize } = params
  let r = 0
  let g = 0
  let b = 0

  for (let i = 0, offset; i < canvasSize; i++) {
    offset = i * 4
    r = data[offset + 0]
    g = data[offset + 1]
    b = data[offset + 2]
  }
  // 求取平均值
  r = Math.round(r / canvasSize)
  g = Math.round(g / canvasSize)
  b = Math.round(b / canvasSize)

  return [r, g, b]
}

/**
 * 根据图片平均色值获取文字最佳展示颜色
 * @param params
 * @returns
 */
export const getImgContrast = async (params:GetImgDataParams):Promise<'white'|'black'> => {
  const imgData = await getImgData(params)
  const [r, g, b] = getAverageColor(imgData)
  const contrast = getContrastYIQ(r, g, b)
  return contrast
}

/**
 * 根据十六进制颜色获取文字最佳展示颜色
 * @param color
 * @returns
 */
export const getColorContrast = (color:string):'white'|'black' => {
  const [r, g, b] = hexToRgb(color)
  const contrast = getContrastYIQ(r, g, b)
  return contrast
}
