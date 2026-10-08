import {
	Rocket,
	FolderTree,
	Zap,
	Palette,
	Package,
	ArrowRight,
} from 'lucide-react';

import type { ChartConfig } from '@/components/ui/chart';

import {
	BarChartComponent,
	ScatterChartComponent,
	PieChartComponent,
	AreaChartComponent,
	RadarChartComponent,
	FunnelChartComponent,
	LineChartComponent,
} from '@/components/charts';
import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';

export function Home() {
	const data = [
		{ date: '2024-01', 访问量: 400, 转化量: 240 },
		{ date: '2024-02', 访问量: 300, 转化量: 139 },
		{ date: '2024-03', 访问量: 500, 转化量: 380 },
		{ date: '2024-04', 访问量: 478, 转化量: 430 },
		{ date: '2024-05', 访问量: 589, 转化量: 520 },
		{ date: '2024-06', 访问量: 439, 转化量: 290 },
		{ date: '2024-07', 访问量: 449, 转化量: 300 },
	];

	const chartConfig = {
		访问量: {
			label: '访问量',
			color: 'var(--chart-3)',
		},
		转化量: {
			label: '转化量',
			color: 'var(--chart-2)',
		},
	} satisfies ChartConfig;

	const scatterConfig = {
		x: {
			label: 'X 值',
		},
		y: {
			label: 'Y 值',
		},
		z: {
			label: 'Z 值',
		},
	} satisfies ChartConfig;

	const pieConfig = {
		访问量: {
			label: '访问量',
			color: 'var(--chart-1)',
		},
		转化量: {
			label: '转化量',
			color: 'var(--chart-2)',
		},
		其他: {
			label: '其他',
			color: 'var(--chart-3)',
		},
	} satisfies ChartConfig;

	const radarConfig = {
		A: {
			label: 'A 值',
			color: 'var(--chart-1)',
		},
		B: {
			label: 'B 值',
			color: 'var(--chart-2)',
		},
	} satisfies ChartConfig;

	const funnelConfig = {
		value: {
			label: '值',
		},
	} satisfies ChartConfig;

	const scatterData = [
		{ x: 100, y: 200, z: 200, color: 'var(--chart-1)' },
		{ x: 120, y: 100, z: 260, color: 'var(--chart-2)' },
		{ x: 170, y: 300, z: 400, color: 'var(--chart-3)' },
		{ x: 140, y: 250, z: 280, color: 'var(--chart-4)' },
		{ x: 150, y: 400, z: 500, color: 'var(--chart-5)' },
		{ x: 110, y: 280, z: 200, color: 'var(--chart-1)' },
	];

	const pieData = [
		{ name: '访问量', value: 400 },
		{ name: '转化量', value: 240 },
		{ name: '其他', value: 100 },
	];

	const radarData = [
		{ subject: 'Math', A: 120, B: 110 },
		{ subject: 'Chinese', A: 98, B: 130 },
		{ subject: 'English', A: 86, B: 130 },
		{ subject: 'Geography', A: 99, B: 100 },
		{ subject: 'Physics', A: 85, B: 90 },
		{ subject: 'History', A: 65, B: 85 },
	];

	const funnelData = [
		{ name: '访问', value: 1000 },
		{ name: '注册', value: 800 },
		{ name: '购买', value: 500 },
		{ name: '复购', value: 200 },
	];

	return (
		<div
			className="min-h-screen bg-white p-6 text-slate-900 md:p-12
				dark:bg-slate-950 dark:text-slate-100"
		>
			<div className="mx-auto max-w-4xl space-y-10">
				<header className="space-y-4">
					<div className="flex items-center gap-2">
						<Badge
							className="rounded-full border-slate-200 px-4 py-1 font-medium
								dark:border-slate-800"
							variant="outline"
						>
							v1.0.0 Stable
						</Badge>
					</div>
					<h1 className="text-4xl font-bold tracking-tight md:text-5xl">
						Ichiyo <span className="text-slate-400">Template</span>
					</h1>
					<p
						className="max-w-2xl text-lg leading-relaxed text-slate-500
							dark:text-slate-400"
					>
						基于 React Compiler 与 Tailwind v4 构建的高性能现代化开发环境。
					</p>
				</header>

				<div className="grid gap-6">
					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Rocket className="size-5 text-slate-600 dark:text-slate-400" />
								快速开始
							</CardTitle>
							<CardDescription>通过以下步骤配置并运行您的项目</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4">
								{[
									{
										label: '目录结构',
										desc: '核心业务逻辑位于 src/ 目录，支持 @/ 路径别名',
										icon: <FolderTree className="size-5" />,
									},
									{
										label: '启动项目',
										desc: '执行 bun run dev 开启 Vite 热更新开发服务器',
										icon: <Zap className="size-5" />,
									},
									{
										label: '样式定制',
										desc: 'Tailwind v4 采用原生 CSS 变量配置，更加直观快捷',
										icon: <Palette className="size-5" />,
									},
									{
										label: '构建部署',
										desc: '运行 bun run build 生成高度优化的静态资源包',
										icon: <Package className="size-5" />,
									},
								].map((item, i) => (
									<div
										className="group flex cursor-default items-center
											justify-between rounded-xl border border-transparent p-4
											transition-all hover:border-slate-200 hover:bg-white
											dark:hover:border-slate-800 dark:hover:bg-slate-900"
										key={i}
									>
										<div className="flex items-center gap-4">
											<div
												className="rounded-lg bg-slate-200/50 p-2 text-slate-600
													transition-colors group-hover:bg-slate-900
													group-hover:text-white dark:bg-slate-800
													dark:text-slate-400 dark:group-hover:bg-slate-100
													dark:group-hover:text-slate-900"
											>
												{item.icon}
											</div>
											<div>
												<p className="font-semibold">{item.label}</p>
												<p
													className="text-sm text-slate-500 dark:text-slate-400"
												>
													{item.desc}
												</p>
											</div>
										</div>
										<ArrowRight
											className="size-4 -translate-x-2 text-slate-300 opacity-0
												transition-all group-hover:translate-x-0
												group-hover:text-slate-900 group-hover:opacity-100
												dark:group-hover:text-white"
										/>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				<header className="space-y-4">
					<h1 className="text-2xl font-bold tracking-tight md:text-3xl">
						Template <span className="text-slate-400">Charts</span>
					</h1>
					<p
						className="max-w-2xl text-base leading-relaxed text-slate-500
							dark:text-slate-400"
					>
						基于 coss ui + recharts
						构建的多样化图表组件，满足各种数据可视化需求。
					</p>
				</header>

				<div className="grid gap-6">
					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle>数据统计</CardTitle>
							<CardDescription>访问量与转化量对比</CardDescription>
						</CardHeader>
						<CardContent>
							<BarChartComponent
								barKeys={['访问量', '转化量']}
								config={chartConfig}
								data={data}
								height={400}
								xAxisKey="date"
								xAxisLabel="月份"
								yAxisLabel="数量"
							/>
						</CardContent>
					</Card>

					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle>散点图示例</CardTitle>
							<CardDescription>数据点分布</CardDescription>
						</CardHeader>
						<CardContent>
							<ScatterChartComponent
								config={scatterConfig}
								data={scatterData}
								height={400}
								xAxisKey="x"
								xAxisLabel="X 值"
								yAxisKey="y"
								yAxisLabel="Y 值"
								zAxisKey="z"
							/>
						</CardContent>
					</Card>

					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle>饼图示例</CardTitle>
							<CardDescription>数据占比</CardDescription>
						</CardHeader>
						<CardContent>
							<PieChartComponent
								config={pieConfig}
								data={pieData}
								dataKey="value"
								height={400}
								nameKey="name"
							/>
						</CardContent>
					</Card>

					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle>面积图示例</CardTitle>
							<CardDescription>趋势展示</CardDescription>
						</CardHeader>
						<CardContent>
							<AreaChartComponent
								areaKeys={['访问量', '转化量']}
								config={chartConfig}
								data={data}
								height={400}
								xAxisKey="date"
								xAxisLabel="月份"
								yAxisLabel="数量"
							/>
						</CardContent>
					</Card>

					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle>雷达图示例</CardTitle>
							<CardDescription>多维度对比</CardDescription>
						</CardHeader>
						<CardContent>
							<RadarChartComponent
								config={radarConfig}
								data={radarData}
								dataKeys={['A', 'B']}
								height={400}
								nameKey="subject"
							/>
						</CardContent>
					</Card>

					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle>漏斗图示例</CardTitle>
							<CardDescription>转化漏斗</CardDescription>
						</CardHeader>
						<CardContent>
							<FunnelChartComponent
								colors={[
									'var(--chart-1)',
									'var(--chart-2)',
									'var(--chart-3)',
									'var(--chart-4)',
								]}
								config={funnelConfig}
								data={funnelData}
								dataKey="value"
								height={400}
								nameKey="name"
							/>
						</CardContent>
					</Card>

					<Card
						className="border-slate-200 bg-slate-50/50 shadow-none
							dark:border-slate-800 dark:bg-slate-900/50"
					>
						<CardHeader>
							<CardTitle>线图示例</CardTitle>
							<CardDescription>趋势线展示</CardDescription>
						</CardHeader>
						<CardContent>
							<LineChartComponent
								config={chartConfig}
								data={data}
								height={400}
								lineKeys={['访问量', '转化量']}
								lineType="linear"
								xAxisKey="date"
								xAxisLabel="月份"
								yAxisLabel="数量"
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
