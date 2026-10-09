import { useGSAP } from '@gsap/react';
import { ArrowRight } from '@keyline-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

import { GithubGlyph } from '@/components/github-glyph';
import { AppleIcon, LinuxIcon, WindowsIcon } from '@/components/platform-icons';
import { Aurora } from '@/components/react-bits/aurora';
import { SplitText } from '@/components/react-bits/split-text';
import { SiteHeader } from '@/components/site-header';
import { AppMock } from '@/pages/landing/app-mock';
import { useTheme } from '@/pages/landing/use-theme';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const REPO_URL = 'https://github.com/1Yie/madora';
const RELEASES_URL = 'https://github.com/1Yie/madora/releases';

export function Landing() {
	const rootRef = useRef<HTMLDivElement>(null);
	const [scrolled, setScrolled] = useState(false);
	const { dark } = useTheme();

	// Header stays transparent over the hero and only gains a surface once the page scrolls.
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 80);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useGSAP(
		() => {
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

			gsap.from('[data-hero-fade]', {
				opacity: 0,
				y: 16,
				duration: 0.9,
				ease: 'power3.out',
				stagger: 0.12,
				delay: 0.9,
			});

			gsap.from('[data-mock]', {
				opacity: 0,
				y: 100,
				rotateX: 10,
				duration: 1.3,
				ease: 'power4.out',
				scrollTrigger: { trigger: '[data-mock]', start: 'top 85%', once: true },
			});

			gsap.to('[data-hero-aurora]', {
				yPercent: 18,
				ease: 'none',
				scrollTrigger: {
					trigger: '[data-hero]',
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			});
		},
		{ scope: rootRef }
	);

	return (
		<div
			className="min-h-dvh bg-[oklch(0.985_0_0)] text-[oklch(0.145_0_0)]
				antialiased dark:bg-[oklch(0.19_0_0)] dark:text-[oklch(0.985_0_0)]"
			ref={rootRef}
		>
			<SiteHeader scrolled={scrolled} />

			<section
				className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-32"
				data-hero
				id="app"
			>
				<div className="absolute inset-0" data-hero-aurora>
					<Aurora
						amplitude={1}
						blend={0.5}
						// Light: pastel wash on white. Dark: the additive glow on the dark background.
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
						gap-10"
				>
					{/* Hero copy: left aligned, mono, two lines (dark / grey) */}
					<div className="flex flex-col items-start gap-6">
						<div
							className="flex flex-col items-start font-mono text-4xl
								leading-[1.15] tracking-tight md:text-6xl"
						>
							<SplitText
								className="font-normal text-[oklch(0.145_0_0)]
									dark:text-[oklch(0.985_0_0)]"
								text="Markdown editing,"
							/>
							<SplitText
								className="font-normal text-[oklch(0.556_0_0)]
									dark:text-[oklch(0.708_0_0)]"
								text="powered by AI."
							/>
						</div>
						<div className="flex flex-wrap items-start gap-3" data-hero-fade>
							<div className="flex flex-col items-start gap-2">
								<a
									className="inline-flex h-9 items-center gap-2 rounded-lg
										bg-[oklch(0.205_0_0)] px-4 text-sm font-medium
										text-[oklch(0.985_0_0)] transition-opacity hover:opacity-85
										dark:bg-[oklch(0.92_0_0)] dark:text-[oklch(0.2_0_0)]"
									href={RELEASES_URL}
									rel="noreferrer"
									target="_blank"
								>
									立即下载
									<ArrowRight className="size-4" />
								</a>
								<div
									className="flex items-center gap-3 text-[oklch(0.556_0_0)]
										dark:text-[oklch(0.708_0_0)]"
								>
									{/* No OS logos in keyline: a window (Windows), command key (macOS), terminal (Linux). */}
									<WindowsIcon className="size-4" />
									<AppleIcon className="size-4" />
									<LinuxIcon className="size-4" />
								</div>
							</div>

							<a
								className="inline-flex h-9 items-center gap-2 rounded-lg border
									border-[oklch(0.922_0_0)] bg-white px-4 text-sm font-medium
									transition-colors hover:bg-[oklch(0.97_0_0)]
									dark:border-white/20 dark:bg-[oklch(0.3_0_0)]
									dark:text-[oklch(0.985_0_0)] dark:hover:bg-[oklch(0.36_0_0)]"
								href={REPO_URL}
								rel="noreferrer"
								target="_blank"
							>
								<GithubGlyph className="size-4" />
								查看源码
							</a>
						</div>
					</div>

					{/* The app mock sits directly under the copy, so both are in the first screen. */}
					<div data-mock>
						<AppMock />
					</div>
				</div>
			</section>

			<footer
				className="border-t border-[oklch(0.922_0_0)] px-6 py-10 text-sm
					text-[oklch(0.556_0_0)] dark:border-white/10
					dark:text-[oklch(0.708_0_0)]"
			>
				<div
					className="mx-auto flex max-w-[1440px] flex-wrap items-center
						justify-between gap-4"
				>
					<span>Madora · GPL-3.0</span>
					<a
						className="hover:text-black dark:hover:text-white"
						href={REPO_URL}
						rel="noreferrer"
						target="_blank"
					>
						1Yie/madora
					</a>
				</div>
			</footer>
		</div>
	);
}
