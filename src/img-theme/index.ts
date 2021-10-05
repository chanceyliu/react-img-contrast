import { CreatePixelArrayParams, GetPaletteParams } from '../interface'
import quantize from 'quantize'
import { getImgData } from '../utils'

/**
 * 整理有效像素数组
 * @param param0
 * @returns
 */
export const createPixelArray = ({
  imgData,
  pixelCount,
  quality
}: CreatePixelArrayParams) => {
  const pixels = imgData
  const pixelArray = []

  // 以适合量化函数的数组格式存储 RGB 值
  for (let i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
    offset = i * 4
    r = pixels[offset + 0]
    g = pixels[offset + 1]
    b = pixels[offset + 2]
    a = pixels[offset + 3]

    // 像素要是不透明的和半透明以上的
    if (typeof a === 'undefined' || a >= 125) {
      // 像素不能是太贴近白色的
      if (!(r > 250 && g > 250 && b > 250)) {
        pixelArray.push([r, g, b])
      }
    }
  }

  return pixelArray
}

/**
 * 获取图片主题色板
 * @param param0
 * @returns
 * Use the median cut algorithm provided by quantize.js to cluster similar colors.
 *
 * Function does not always return the requested amount of colors. It can be +/- 2
 *
 * quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster the palette generation but the greater the likelihood that colors will be missed.
 */
export const getPalette = async ({
  imgSrc,
  colorCount = 10,
  quality = 10
}: GetPaletteParams) => {
  if (
    typeof colorCount === 'undefined' ||
    !Number.isInteger(colorCount) ||
    colorCount < 2 ||
    colorCount > 20
  ) {
    colorCount = 10
  }

  if (
    typeof quality === 'undefined' ||
    !Number.isInteger(quality) ||
    quality < 1
  ) {
    quality = 10
  }

  const { data: imgData, canvasSize: pixelCount } = await getImgData({
    imgSrc
  })
  const pixelArray = createPixelArray({
    imgData,
    pixelCount,
    quality: quality
  })

  // 这个包将像素数组进行量化，聚类，最终返回面板数组
  // 使用中位切分法
  const cmap = quantize(pixelArray, colorCount)
  const palette = cmap ? cmap.palette() : null

  return palette
}

/**
 * 获取图片主题色
 * @param param0
 * @returns
 */
export const getColor = async ({ imgSrc, quality = 10 }:Omit<GetPaletteParams, 'colorCount'>) => {
  const palette = await getPalette({ imgSrc, quality })
  const mainColor = palette[0]
  return mainColor
}
