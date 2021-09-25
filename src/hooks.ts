import { useCallback, useEffect, useState } from 'react'
import { getImgContrast, hexToRgb, getContrastYIQ } from './utils'
import { ContrastColor, GetImgColorParams } from './interface'

export const useImgContrast = (params: GetImgColorParams) => {
  const [imgContrast, setImgContrast] = useState<ContrastColor>('black')

  const initCanvas = useCallback(async () => {
    const [r, g, b] = await getImgContrast({ ...params })
    const res = getContrastYIQ(r, g, b)
    setImgContrast(res)
  }, [])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  return {
    imgContrast
  }
}

export const useColorContrast = (hexColor: string) => {
  const [colorContrast, setColorContrast] = useState<ContrastColor>('black')

  const initCanvas = useCallback(() => {
    const [r, g, b] = hexToRgb(hexColor)
    const res = getContrastYIQ(r as number, g as number, b as number)
    setColorContrast(res)
  }, [])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  return {
    colorContrast
  }
}
