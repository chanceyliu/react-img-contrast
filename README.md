## 安装

```shell
$ npm install react-img-contrast
```

## 用法

```typescript
import { useImgContrast } from "react-img-contrast";
import defaultBackground from "@/assets/default-background.png";

export default () => {
  const { imgContrast } = useImgContrast({
    imgSrc: defaultBackground,
    xMultiple: 0.3,
    yMultiple: 0.8,
    wMultiple: 0.4,
    hMultiple: 0.2,
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${defaultBackground})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ color: imgContrast }}>版权版权信息</div>
    </div>
  );
};
```

除了 hooks 的用法，还提供了 `getImgContrast` 方法供直接使用，异步返回文字颜色

```react
import { getImgContrast } from "react-img-contrast";

const handler = async() => {
  const res = await getImgContrast({
    imgSrc: defaultBackground,
    xMultiple: 0.3,
    yMultiple: 0.8,
    wMultiple: 0.4,
    hMultiple: 0.2,
  })
}
```

## 其他方法&参数说明

**useImgContrast** && **getImgContrast**方法参数相同

- **`imgSrc`** ：要计算图片的地址

- **`xMultiple` `可选`** ：截取点的 x 轴距离，取与图片宽度的比例系数，默认 0

- **`yMultiple` `可选`** ：截取点的 y 轴距离，取与图片高度的比例系数，默认 0

- **`wMultiple` `可选`** ：要截取的比例（以图片宽度为准），默认 1

- **`hMultiple` `可选`** ：要截取的比例（以图片高度为准），默认 1

<img src="https://chanceyliu-1301861058.cos.ap-chongqing.myqcloud.com/markdown/%E6%97%A0%E6%A0%87%E9%A2%98%E6%B5%81%E7%A8%8B%E5%9B%BE.png" alt="无标题流程图" style="zoom:50%;" />

**useColorContrast** 生成不同颜色下文字的最佳展示颜色

- **`hexColor`**：16 进制的颜色，如 `#ffffff`

```typescript
import { useColorContrast } from "react-img-contrast";

const backgroundColor = "#ffffff";
export default () => {
  const { colorContrast } = useColorContrast(backgroundColor);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: backgroundColor,
      }}
    >
      <div style={{ color: colorContrast }}>版权版权信息</div>
    </div>
  );
};
```

**hexToRgb** 将 16 进制的色值转换为 RGB 值

- **`hexColor`** ：16 进制的颜色，如 `#ffffff`

```typescript
import { hexToRgb } from "react-img-contrast";

const res = hexToRgb("#ffffff");
// => '[255,255,255]'

const res = hexToRgb("#ffffff");
```
