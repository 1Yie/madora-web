# Ichiyo Template

基于 React Compiler 与 Tailwind v4 构建的高性能现代化开发环境。

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC.svg)](https://tailwindcss.com/)

## ✨ 特性

- 🚀 **React 19** + **React Compiler** - 最新的 React 特性和编译时优化
- ⚡ **Vite 7** - 极快的构建工具和开发服务器
- 🎨 **Tailwind CSS v4** - 现代化的 CSS 框架，支持原生 CSS 变量
- 📊 **Recharts** - 强大的数据可视化图表库
- 🧩 **组件库** - 基于 shadcn/ui 的完整 UI 组件集合
- 🔧 **TypeScript** - 完整的类型安全支持
- 📱 **响应式设计** - 移动端友好的布局
- 🌙 **深色模式** - 内置深色主题支持
- 🎯 **ESLint + Prettier** - 代码质量和格式化工具
- 📝 **Commitlint + Husky** - Git 提交规范和钩子

## 📦 技术栈

### 核心框架

- **React 19.2.0** - 用户界面库
- **React Router 7.10.1** - 路由管理
- **TypeScript 5.9.3** - 类型安全

### 构建工具

- **Vite 7.2.4** - 构建工具
- **@vitejs/plugin-react** - React 插件
- **babel-plugin-react-compiler** - React 编译器插件

### 样式

- **Tailwind CSS 4.1.18** - CSS 框架
- **@tailwindcss/vite** - Tailwind Vite 插件
- **tailwind-merge** - 样式合并工具
- **class-variance-authority** - 样式变体管理

### 图表可视化

- **Recharts 3.6.0** - React 图表库
- 支持多种图表类型：柱状图、折线图、饼图、面积图、散点图、雷达图、漏斗图

### UI 组件

- **@base-ui/react** - 基础 UI 组件
- **lucide-react** - 图标库
- 完整的组件集合：按钮、卡片、表单、对话框、表格等

### 开发工具

- **ESLint 9.39.1** - 代码检查
- **Prettier** - 代码格式化
- **Husky** - Git 钩子
- **lint-staged** - 暂存文件检查
- **Commitlint** - 提交信息规范

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm/yarn/pnpm/bun

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install

# 使用 bun (推荐)
bun install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev

# 使用 bun
bun run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 使用 yarn
yarn build

# 使用 pnpm
pnpm build

# 使用 bun
bun run build
```

### 代码检查

```bash
# 代码检查
npm run lint

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── api/                    # API 接口
│   ├── home/              # 首页相关接口
│   ├── request.ts         # 请求配置
│   └── urls.ts            # 接口地址
├── components/            # 组件
│   ├── charts/           # 图表组件
│   │   ├── area-chart.tsx
│   │   ├── bar-chart.tsx
│   │   ├── line-chart.tsx
│   │   ├── pie-chart.tsx
│   │   ├── radar-chart.tsx
│   │   ├── scatter-chart.tsx
│   │   ├── funnel-chart.tsx
│   │   └── index.ts
│   └── ui/               # UI 组件库
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── dialog.tsx
│       └── ...
├── hooks/                # 自定义 Hooks
├── layout/               # 布局组件
├── lib/                  # 工具库
│   └── utils.ts
├── pages/                # 页面组件
│   └── home/
│       └── index.tsx
├── router/               # 路由配置
│   └── index.tsx
├── App.tsx               # 应用入口
├── index.css             # 全局样式
└── main.tsx             # 主入口文件
```

## 🎨 图表组件

项目内置了丰富的图表组件，支持多种数据可视化需求：

### 支持的图表类型

- **柱状图** (`BarChartComponent`) - 数据对比展示
- **折线图** (`LineChartComponent`) - 趋势分析
- **饼图** (`PieChartComponent`) - 占比展示
- **面积图** (`AreaChartComponent`) - 面积填充趋势
- **散点图** (`ScatterChartComponent`) - 数据分布
- **雷达图** (`RadarChartComponent`) - 多维度对比
- **漏斗图** (`FunnelChartComponent`) - 转化分析

### 图表组件特性

- 📊 响应式设计，适配不同屏幕尺寸
- 🎨 支持深色/浅色主题切换
- 🛠 高度可定制，支持自定义颜色、尺寸
- 📱 移动端友好
- ♿ 无障碍访问支持

### 使用示例

```tsx
import { BarChartComponent } from '@/components/charts';

const data = [
	{ date: '2024-01', 访问量: 400, 转化量: 240 },
	{ date: '2024-02', 访问量: 300, 转化量: 139 },
];

const chartConfig = {
	访问量: { label: '访问量', color: 'var(--chart-1)' },
	转化量: { label: '转化量', color: 'var(--chart-2)' },
};

<BarChartComponent
	data={data}
	config={chartConfig}
	xAxisKey="date"
	barKeys={['访问量', '转化量']}
/>;
```

## 🎯 UI 组件库

基于 shadcn/ui 设计理念，提供完整的 UI 组件集合：

### 基础组件

- Button - 按钮组件
- Card - 卡片容器
- Badge - 徽章标签
- Avatar - 用户头像

### 表单组件

- Input - 输入框
- Textarea - 多行文本
- Select - 下拉选择
- Checkbox - 复选框
- Radio - 单选框

### 反馈组件

- Alert - 警告提示
- Dialog - 对话框
- Toast - 消息提示
- Progress - 进度条

### 数据展示

- Table - 数据表格
- Pagination - 分页组件
- Empty - 空状态

### 导航组件

- Tabs - 标签页
- Breadcrumb - 面包屑导航
- Sidebar - 侧边栏

## 🎨 样式配置

### Tailwind CSS v4

项目使用 Tailwind CSS v4，支持原生 CSS 变量配置：

```css
:root {
	--background: #ffffff;
	--foreground: #0f172a;
	--primary: #0f172a;
	/* ... */
}

.dark {
	--background: #020617;
	--foreground: #f1f5f9;
	/* ... */
}
```

### 主题切换

项目内置深色模式支持，通过 CSS 类切换：

```tsx
// 浅色模式
<div className="bg-white text-slate-900">

// 深色模式
<div className="dark:bg-slate-950 dark:text-slate-100">
```

## 🔧 开发配置

### TypeScript 配置

项目使用现代 TypeScript 配置，支持路径别名：

```json
{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	}
}
```

### ESLint 配置

严格的代码质量检查：

- React Hooks 规则
- TypeScript 推荐规则
- React Refresh 开发规则

### Git 提交规范

使用 Conventional Commits 规范：

```bash
<type>[optional scope]: <description>

# 示例
feat: add new chart component
fix: resolve chart rendering issue
docs: update README documentation
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 创建 [GitHub Issue](https://github.com/1Yie/my-react-template/issues)
- 发送邮件至 [your-email@example.com]

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
