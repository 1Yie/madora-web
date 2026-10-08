import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
} from 'recharts';

import type { ChartConfig } from '@/components/ui/chart';

import {
	ChartContainer,
	ChartTooltipContent,
	ChartTooltip,
} from '@/components/ui/chart';
import { Empty, EmptyTitle, EmptyMedia } from '@/components/ui/empty';

interface RadarChartProps {
	data: Record<string, string | number>[];
	config: ChartConfig;
	dataKeys: string[];
	nameKey: string;
	width?: number;
	height?: number;
}

export function RadarChartComponent({
	data,
	config,
	dataKeys,
	nameKey,
	width,
	height,
}: RadarChartProps) {
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
								<polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
								<line x1="12" x2="12" y1="2" y2="22" />
								<line x1="2" x2="22" y1="8.5" y2="15.5" />
								<line x1="22" x2="2" y1="8.5" y2="15.5" />
							</svg>
						</EmptyMedia>
						<EmptyTitle className="text-muted-foreground">暂无数据</EmptyTitle>
					</Empty>
				</div>
			}
			height={height}
			width={width}
		>
			<RadarChart
				data={data}
				margin={{ top: 20, right: 30, bottom: 40, left: 20 }}
			>
				<PolarGrid />
				<PolarAngleAxis dataKey={nameKey} />
				<PolarRadiusAxis />
				{dataKeys.map((key, index) => (
					<Radar
						dataKey={key}
						fill={`var(--color-${key})`}
						fillOpacity={0.1 + index * 0.2}
						key={key}
						stroke={`var(--color-${key})`}
					/>
				))}
				<ChartTooltip content={<ChartTooltipContent />} />
			</RadarChart>
		</ChartContainer>
	);
}
