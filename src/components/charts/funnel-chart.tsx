import { Funnel, FunnelChart, LabelList, Cell } from 'recharts';

import type { ChartConfig } from '@/components/ui/chart';

import {
	ChartContainer,
	ChartTooltipContent,
	ChartTooltip,
} from '@/components/ui/chart';
import { Empty, EmptyTitle, EmptyMedia } from '@/components/ui/empty';

interface FunnelChartProps {
	data: Record<string, string | number>[];
	config: ChartConfig;
	dataKey: string;
	nameKey: string;
	colors?: string[];
	width?: number;
	height?: number;
}

export function FunnelChartComponent({
	data,
	config,
	dataKey,
	colors = [
		'var(--chart-1)',
		'var(--chart-2)',
		'var(--chart-3)',
		'var(--chart-4)',
		'var(--chart-5)',
	],
	width,
	height,
}: FunnelChartProps) {
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
								<path d="M4.5 2h15l-1.5 18h-12z" />
								<path d="M6 6h12" />
								<path d="M6 10h6" />
								<path d="M6 14h3" />
								<path d="M14 6v12" />
							</svg>
						</EmptyMedia>
						<EmptyTitle className="text-muted-foreground">暂无数据</EmptyTitle>
					</Empty>
				</div>
			}
			height={height}
			width={width}
		>
			<FunnelChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Funnel data={data} dataKey={dataKey} isAnimationActive>
					{data.map((_, index) => (
						<Cell fill={colors[index % colors.length]} key={`cell-${index}`} />
					))}
					<LabelList fill="#fff" position="center" stroke="none" />
				</Funnel>
			</FunnelChart>
		</ChartContainer>
	);
}
