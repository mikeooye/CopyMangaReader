# CopyManga Reader

一个 Tampermonkey 用户脚本，优化[拷贝漫画](https://www.copymanga.com/)的阅读体验。

## 功能

- **双模式阅读**
  - **Webtoon 模式**（按 `1`）：图片按宽度自适应排列，适合条漫阅读。可按 `+`/`-` 调整图片宽度
  - **纵向阅读模式**（按 `2`）：保留原始布局，仅隐藏广告，适合传统翻页漫画
- **宽度调节**（仅 Webtoon 模式）：`+`/`=` 增大宽度，`-`/`_` 减小宽度，`0` 重置为默认值（640px）
- **自动隐藏广告**：移除页面中的 `upMember`、`comicContainerAds` 等广告元素
- **模式记忆**：自动记住每部漫画最后使用的阅读模式，保留最近 5 部漫画的记录
- **模式指示器**：在页面顶部 header 中显示当前模式

## 快捷键

| 按键 | 功能 |
|------|------|
| `1` | 切换到 Webtoon 模式 |
| `2` | 切换到 纵向阅读模式 |
| `+` / `=` | 增加图片宽度（Webtoon 模式，步长 100px） |
| `-` / `_` | 减小图片宽度（Webtoon 模式，步长 100px，最小 300px） |
| `0` | 重置宽度为 640px |

> 在输入框或文本框中聚焦时快捷键不会生效。

## 安装

### 前置条件

- 浏览器已安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展

### 方法一：直接安装（推荐）

1. 打开脚本发布页面（待补充）
2. 点击安装

### 方法二：自行构建

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 产物在 dist/index.js
```

构建产物为 IIFE 格式，已包含 `==UserScript==` 元信息块。将 `dist/index.js` 的内容复制到 Tampermonkey 新建脚本中即可。

### 开发

```bash
# 监听模式
pnpm watch
```

## 支持的域名

- `copymanga.com`
- `copymanga.org`
- `copymanga.site`
- `copymanga.tv`
- `mangacopy.com`
- `2025copy.com`
- `2026copy.com`

脚本在 `/comic/*/chapter/*` 路径下自动运行。

## 技术栈

- **TypeScript** — 类型安全
- **tsup** — 构建打包，输出 IIFE 格式
- **Tampermonkey** — 用户脚本运行时

## License

ISC
