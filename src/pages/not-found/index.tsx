import { ArrowRight } from '@keyline-icons/react';
import { Link } from 'react-router-dom';

import { Aurora } from '@/components/react-bits/aurora';
import { SiteHeader } from '@/components/site-header';
import { useTheme } from '@/pages/landing/use-theme';

// Mirrors the landing page: same header, same mono headline, same aurora, same dark tokens.
export function NotFound() {
	const { dark } = useTheme();

	return (
		<div
			className="min-h-dvh bg-[oklch(0.985_0_0)] text-[oklch(0.145_0_0)]
				antialiased dark:bg-[oklch(0.19_0_0)] dark:text-[oklch(0.985_0_0)]"
		>
			<SiteHeader />

			<section
				className="relative flex min-h-dvh items-center overflow-hidden px-6
					pt-14"
			>
				<div className="absolute inset-0">
					<Aurora
						amplitude={1}
						blend={0.5}
						colorStops={
							dark
								? ['#1e3a8a', '#0f766e', '#4c1d95']
								: ['#7cc4ff', '#9ff0d0', '#b7a6ff']
						}
						lightMode={!dark}
						speed={0.6}
					/>
				</div>

				<div
					className="relative z-10 mx-auto flex w-full max-w-[1120px] flex-col
						items-start gap-8"
				>
					<div
						className="flex flex-col items-start font-mono text-4xl
							leading-[1.15] tracking-tight md:text-6xl"
					>
						<span
							className="font-normal text-[oklch(0.145_0_0)]
								dark:text-[oklch(0.985_0_0)]"
						>
							404 — page not found.
						</span>
						<span
							className="font-normal text-[oklch(0.556_0_0)]
								dark:text-[oklch(0.708_0_0)]"
						>
							this path isn&apos;t in Madora.
						</span>
					</div>

					<div className="flex flex-wrap items-center gap-3">
						<Link
							className="inline-flex h-9 items-center gap-2 rounded-lg
								bg-[oklch(0.205_0_0)] px-4 text-sm font-medium
								text-[oklch(0.985_0_0)] transition-opacity hover:opacity-85
								dark:bg-[oklch(0.92_0_0)] dark:text-[oklch(0.2_0_0)]"
							to="/"
						>
							返回首页
							<ArrowRight className="size-4" />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
