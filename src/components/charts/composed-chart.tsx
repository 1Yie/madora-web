import { Bar, Line, ComposedChart, XAxis, YAxis } from 'recharts';

import type { ChartConfig } from '@/components/ui/chart';

import {
	ChartContainer,
	ChartTooltipContent,
	ChartTooltip,
} from '@/components/ui/chart';
import { Empty, EmptyTitle, EmptyMedia } from '@/components/ui/empty';

interface ComposedChartProps {
	data: Record<string, string | number>[];
	config: ChartConfig;
	xAxisKey: string;
	xAxisLabel?: string;
	yAxisLabel?: string;
	barKeys: string[];
	lineKeys: string[];
	width?: number;
	height?: number;
}

export function ComposedChartComponent({
	data,
	config,
	xAxisKey,
	xAxisLabel = 'X 轴',
	yAxisLabel = 'Y 轴',
	barKeys,
	lineKeys,
	width,
	height,
}: ComposedChartProps) {
	return (
		<ChartContainer
			config={config}
			data={data}
			emptyComponent={
				<div className="flex h-full items-center justify-center">
					<Empty>
						<EmptyMedia variant="icon">
							<svg
								fill="none"
								height="24"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								width="24"
							>
								<path d="M3 3v18h18" />
								<path d="M18 17V9" />
								<path d="M13 17V5" />
								<path d="M8 17v-3" />
								<path d="M21 9H3" />
							</svg>
						</EmptyMedia>
						<EmptyTitle className="text-muted-foreground">暂无数据</EmptyTitle>
					</Empty>
				</div>
			}
			height={height}
			width={width}
		>
			<ComposedChart
				data={data}
				margin={{ top: 20, right: 30, bottom: 40, left: 20 }}
			>
				<XAxis
					dataKey={xAxisKey}
					label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
				/>
				<YAxis
					label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				{barKeys.map((key) => (
					<Bar dataKey={key} fill={`var(--color-${key})`} key={key} />
				))}
				{lineKeys.map((key) => (
					<Line
						dataKey={key}
						key={key}
						stroke={`var(--color-${key})`}
						strokeWidth={2}
						type="monotone"
					/>
				))}
			</ComposedChart>
		</ChartContainer>
	);
}
