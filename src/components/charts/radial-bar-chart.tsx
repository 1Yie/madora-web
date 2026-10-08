import { RadialBar, RadialBarChart, PolarAngleAxis, PolarGrid } from 'recharts';

import type { ChartConfig } from '@/components/ui/chart';

import {
	ChartContainer,
	ChartTooltipContent,
	ChartTooltip,
} from '@/components/ui/chart';
import { Empty, EmptyTitle, EmptyMedia } from '@/components/ui/empty';

interface RadialBarChartProps {
	data: Record<string, string | number>[];
	config: ChartConfig;
	dataKey: string;
	width?: number;
	height?: number;
}

export function RadialBarChartComponent({
	data,
	config,
	dataKey,
	width,
	height,
}: RadialBarChartProps) {
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
								<circle cx="12" cy="12" r="10" />
								<path d="M12 2a10 10 0 0 1 0 20" />
								<path d="M12 2a10 10 0 0 0 0 20" />
							</svg>
						</EmptyMedia>
						<EmptyTitle className="text-muted-foreground">暂无数据</EmptyTitle>
					</Empty>
				</div>
			}
			height={height}
			width={width}
		>
			<RadialBarChart
				barSize={10}
				cx="50%"
				cy="50%"
				data={data}
				innerRadius="10%"
				margin={{ top: 20, right: 30, bottom: 40, left: 20 }}
				outerRadius="80%"
			>
				<PolarGrid gridType="polygon" />
				<PolarAngleAxis
					dataKey={dataKey}
					domain={[0, 100]}
					tick={false}
					type="number"
				/>
				<RadialBar
					background
					dataKey={dataKey}
					fill="var(--chart-1)"
					label={{ position: 'insideStart', fill: '#fff' }}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
			</RadialBarChart>
		</ChartContainer>
	);
}
