export type ContrastColor = 'black' | 'white';

/**
 * 根据图片比例截取
 */
export interface GetImgColorParams {
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
