export type ContrastColor = 'black' | 'white';

/**
 * 获取图片数据参数
 */
export interface GetImgDataParams {
  /**
   * 要对比的图片地址
   */
  imgSrc: string;
  /**
   * 截取点的x轴距离，取与图片宽度的比例系数，默认0
   */
  xMultiple?: number;
  /**
   * 截取点的y轴距离，取与图片高度的比例系数，默认0
   */
  yMultiple?: number;
  /**
   * 要截取的比例（以图片宽度为准），默认1
   */
  wMultiple?: number;
  /**
   * 要截取的比例（以图片高度为准），默认1
   */
  hMultiple?: number;
}

/**
 * 获取图片数据返回值
 */
export interface GetImgDataRes {
  /**
   * 像素数组
   */
  data: Uint8ClampedArray;
  /**
   * canvas尺寸，可理解为像素点数量
   */
  canvasSize: number;
}

/**
 * 获取主题色板参数
 */
export interface GetPaletteParams {
  /**
   * 图片地址
   */
  imgSrc: string;
  /**
   * 要提取多少种数量
   */
  colorCount?: number;
  /**
   * 精度，值越小提取越精确，速度越慢。值越大速度快，但有可能会遗漏颜色
   */
  quality?: number;
}

/**
 * 创建像素数组参数
 */
export interface CreatePixelArrayParams {
  /**
   * 像素数组
   */
  imgData: Uint8ClampedArray;
  /**
   * 像素点数量，也可以理解为图片大小
   */
  pixelCount: number;
  /**
   * 精度，值越小提取越精确，速度越慢。值越大速度快，但有可能会遗漏颜色
   */
  quality: number;
}
