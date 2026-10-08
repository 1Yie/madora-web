import { Pie, PieChart, Cell } from 'recharts';

import type { ChartConfig } from '@/components/ui/chart';

import {
	ChartContainer,
	ChartTooltipContent,
	ChartTooltip,
} from '@/components/ui/chart';
import { Empty, EmptyTitle, EmptyMedia } from '@/components/ui/empty';

interface PieChartProps {
	data: Record<string, string | number>[];
	config: ChartConfig;
	dataKey: string;
	nameKey: string;
	colors?: string[];
	width?: number;
	height?: number;
}

export function PieChartComponent({
	data,
	config,
	dataKey,
	nameKey,
	colors = [
		'var(--chart-1)',
		'var(--chart-2)',
		'var(--chart-3)',
		'var(--chart-4)',
		'var(--chart-5)',
	],
	width,
	height,
}: PieChartProps) {
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
								<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
								<path d="M22 12A10 10 0 0 0 12 2v10z" />
							</svg>
						</EmptyMedia>
						<EmptyTitle className="text-muted-foreground">暂无数据</EmptyTitle>
					</Empty>
				</div>
			}
			height={height}
			width={width}
		>
			<PieChart>
				<Pie
					cx="50%"
					cy="50%"
					data={data}
					dataKey={dataKey}
					label
					nameKey={nameKey}
					outerRadius={80}
				>
					{data.map((_, index) => (
						<Cell fill={colors[index % colors.length]} key={`cell-${index}`} />
					))}
				</Pie>
				<ChartTooltip content={<ChartTooltipContent />} />
			</PieChart>
		</ChartContainer>
	);
}
