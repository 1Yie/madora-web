import { Scatter, ScatterChart, XAxis, YAxis, Cell } from 'recharts';

import type { ChartConfig } from '@/components/ui/chart';

import {
	ChartContainer,
	ChartTooltipContent,
	ChartTooltip,
} from '@/components/ui/chart';
import { Empty, EmptyTitle, EmptyMedia } from '@/components/ui/empty';

interface ScatterDataItem {
	x: number;
	y: number;
	z: number;
	color?: string;
}

interface ScatterChartProps {
	data: ScatterDataItem[];
	config: ChartConfig;
	xAxisKey: string;
	yAxisKey: string;
	zAxisKey: string;
	xAxisLabel?: string;
	yAxisLabel?: string;
	fillColor?: string;
	width?: number;
	height?: number;
}

export function ScatterChartComponent({
	data,
	config,
	xAxisKey,
	yAxisKey,
	zAxisKey,
	xAxisLabel = 'X 轴',
	yAxisLabel = 'Y 轴',
	fillColor = 'var(--chart-1)',
	width,
	height,
}: ScatterChartProps) {
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
								<circle cx="12" cy="12" r="1" />
								<circle cx="19" cy="12" r="1" />
								<circle cx="5" cy="12" r="1" />
								<circle cx="12" cy="19" r="1" />
								<circle cx="12" cy="5" r="1" />
							</svg>
						</EmptyMedia>
						<EmptyTitle className="text-muted-foreground">暂无数据</EmptyTitle>
					</Empty>
				</div>
			}
			height={height}
			width={width}
		>
			<ScatterChart
				data={data}
				margin={{ top: 20, right: 30, bottom: 40, left: 20 }}
			>
				<XAxis
					dataKey={xAxisKey}
					label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
					type="number"
				/>
				<YAxis
					dataKey={yAxisKey}
					label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
					type="number"
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Scatter dataKey={zAxisKey} fill={fillColor}>
					{data.map((entry, index) => (
						<Cell fill={entry.color || fillColor} key={`cell-${index}`} />
					))}
				</Scatter>
			</ScatterChart>
		</ChartContainer>
	);
}
