# Madora 官网

[Madora](https://github.com/1Yie/madora) 的宣传页：一个 Markdown 编辑器，内置 AI 自动补全。

页面里的主屏是按真实应用复刻的编辑器 mock，包括文件树、可滚动标签栏、编辑区、Markdown 预览和底部 git 栏。补全动画会逐个文件播放，并带入预览。

[![React](https://img.shields.io/badge/React-19.2-61DAFB.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC.svg)](https://tailwindcss.com/)

## 页面

| 路径         | 页面                                    |
| ------------ | --------------------------------------- |
| `/`          | 宣传页：Hero、编辑器 mock、平台下载入口 |
| 其它任意路径 | 404 页，风格与宣传页一致                |

- **Hero**：左对齐的等宽标题，背景是跟随深浅主题切换的 Aurora。
- **编辑器 mock**：文件树、标签栏（可滚动，滚轮横向移动）、编辑区、Markdown 预览，以及底部 git 栏。
- **补全动画**：每个文件有自己的补全（光标前的文字加灰色续写），播完后续写保留在编辑区，并同步到预览。
- **下载**：按钮指向 [GitHub Releases](https://github.com/1Yie/madora/releases)，下方是 Windows、macOS、Linux 的单色标志。
- **深浅模式**：页头的按钮切换，选择保存在 `localStorage`，首次访问跟随系统设置。

## 技术栈

- **React 19** + **React Router 7**（`createBrowserRouter`）
- **Vite 7** + **TypeScript 5.9**
- **Tailwind CSS 4**，颜色使用 oklch 变量，深色模式由 `.dark` 类控制
- **GSAP 3**（`@gsap/react`）：Hero 入场、滚动视差、补全动画
- **ogl**：Aurora 背景的 WebGL 渲染
- **@keyline-icons/react**：界面图标
- **JetBrains Mono**（`@fontsource-variable`）：等宽字体

Aurora 和 SplitText 组件改编自 [react-bits](https://reactbits.dev)，平台标志来自 [simple-icons](https://simpleicons.org)（CC0）和微软品牌图形，都已内联，没有额外依赖。

## 快速开始

需要 [Bun](https://bun.sh)（推荐）或 Node.js 18+。

```bash
bun install
bun run dev        # 开发服务器，默认 http://localhost:5173
```

## 脚本

| 命令              | 说明                                         |
| ----------------- | -------------------------------------------- |
| `bun run dev`     | 启动开发服务器                               |
| `bun run build`   | 类型检查（`tsc -b`）后构建生产版本到 `dist/` |
| `bun run preview` | 本地预览生产构建                             |
| `bun run lint`    | ESLint 检查整个项目                          |
| `bun run format`  | ESLint 自动修复并用 Prettier 格式化          |

提交信息遵循 Conventional Commits，由 Commitlint 和 Husky 在提交时校验。

## 部署

项目是单页应用，部署在 Vercel 上。根目录的 `vercel.json` 把所有路径重写到 `index.html`，这样直接访问或刷新子路径（如 `/no-such-page`）时，由前端路由显示 404 页，而不是 Vercel 自己的 404。

```json
{
	"rewrites": [{ "destination": "/index.html", "source": "/(.*)" }]
}
```

## 项目结构

```
src/
├── components/
│   ├── github-glyph.tsx      # GitHub 标志
│   ├── platform-icons.tsx    # Windows / macOS / Linux 单色标志
│   ├── react-bits/           # Aurora、SplitText（改编自 react-bits）
│   ├── site-header.tsx       # 宣传页与 404 页共用的页头
│   └── ui/                   # shadcn 风格的通用组件
├── pages/
│   ├── landing/
│   │   ├── index.tsx         # 宣传页
│   │   ├── app-mock.tsx      # 编辑器 mock（文件树、标签、编辑区、预览）
│   │   ├── mock-prose.css    # 预览排版，数值来自 Madora 的 prose 主题
│   │   └── use-theme.ts      # 深浅模式 hook
│   └── not-found/
│       └── index.tsx         # 404 页
├── hooks/                    # 通用 hooks
├── lib/utils.ts              # cn 等工具函数
├── router/index.tsx          # 路由：/ 与 * 兜底
├── index.css                 # 主题变量与全局样式（含滚动条）
└── main.tsx                  # 入口
```

## 主题

颜色用 oklch 变量定义，取自 Madora 应用本身的 token。深色模式通过 `html.dark` 切换，页面和 mock 都使用 `dark:` 变体，所以切换时整页一起变化。

```tsx
<div className="bg-[oklch(0.985_0_0)] text-[oklch(0.145_0_0)] dark:bg-[oklch(0.19_0_0)] dark:text-[oklch(0.985_0_0)]">
```

## 许可证

本仓库暂未声明许可证。Madora 应用本身采用 [GPL-3.0](https://github.com/1Yie/madora/blob/main/LICENSE)。
