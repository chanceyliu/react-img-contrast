## 安装

```shell
$ npm install react-img-contrast
```

## API

**getImgContrast( { imgSrc [, xMultiple,  yMultiple, wMultiple, hMultiple] } )**

根据图片平均色值返回最佳显示效果的颜色：**black｜white**

- **`imgSrc`** ：要计算图片的地址

- **`xMultiple` `可选`** ：截取点的 x 轴距离，取与图片宽度的比例系数，默认 0

- **`yMultiple` `可选`** ：截取点的 y 轴距离，取与图片高度的比例系数，默认 0

- **`wMultiple` `可选`** ：要截取的比例（以图片宽度为准），默认 1

- **`hMultiple` `可选`** ：要截取的比例（以图片高度为准），默认 1

<img src="https://chanceyliu-1301861058.cos.ap-chongqing.myqcloud.com/markdown/%E6%97%A0%E6%A0%87%E9%A2%98%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="无标题流程图" style="zoom:50%;" />

```javascript
import { getImgContrast } from "react-img-contrast";

const handler = async () => {
  const res = await getImgContrast({
    imgSrc: defaultBackground,
    xMultiple: 0.3,
    yMultiple: 0.8,
    wMultiple: 0.4,
    hMultiple: 0.2,
  });
  
  console.log(res) // => white|black
};

```

---



**getColorContrast( color )**

根据图片平均色值返回最佳显示效果的颜色：**black｜white**

- **`color`** ：16进制颜色，如 `#ffffff` ，如果你只有 `rgb` 颜色，可使用该项目下的 `rgbToHex` 方法转化颜色

```javascript
import { getColorContrast } from "react-img-contrast";

const handler = () => {
  const res = getColorContrast('#ffffff');
  
  console.log(res) // => black
};

```

---



**getPalette( {  imgSrc [, colorCount, quality ] } )**

获取图片的主题调色板，将返回一个 `rgb` 颜色的数组

- **`imgSrc`** ：要获取主题色板的图片地址
- **`colorCount` `可选`** ：要获取多少种主题色，范围为 2 - 20，默认为10
- **`quality` `可选`** ：必须是值 1 或更大的整数，默认为 10，值越大，返回速度越快，但提取的主题色可能就没那么精准，你必须在精度和速度之间做权衡

```javascript
import { getPalette } from "react-img-contrast";

const handler = async () => {
  const res = await getPalette({imgSrc: defaultBackground});
  
  console.log(res) // => [[102, 51, 153],[65, 51, 153],...]
};

```

---



**getColor( {  imgSrc [, quality ] } )**

获取图片的主题调色板，将返回一个 `rgb` 颜色的数组

```javascript
import { getColor } from "react-img-contrast";

const handler = async () => {
  const res = await getColor({imgSrc: defaultBackground});
  
  console.log(res) // => [102, 51, 153]
};

```

---



## 工具方法

**hexToRgb( hexColor )** 

将 16 进制的色值转换为 RGB 值

- **`hexColor`** ：16 进制的颜色，如 `#ffffff`

```typescript
import { hexToRgb } from "react-img-contrast";

const res = hexToRgb("#ffffff");

console.log(res) // => '[255,255,255]'
```

---



**rgbToHex( rgbColor )** 

将 16 进制的色值转换为 RGB 值

- **`rgbToHex`** ：rgb颜色数组，如 ` [255,255,255]`

```typescript
import { rgbToHex } from "react-img-contrast";

const res = rgbToHex([255,255,255]);

console.log(res) // => '#ffffff'
```

---



