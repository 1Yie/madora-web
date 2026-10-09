import { Moon, Sun } from '@keyline-icons/react';
import { Link } from 'react-router-dom';

import { GithubGlyph } from '@/components/github-glyph';
import { cn } from '@/lib/utils';
import { useTheme } from '@/pages/landing/use-theme';

const REPO_URL = 'https://github.com/1Yie/madora';

// Shared top bar for the landing and not-found pages. The brand links home, the
// theme toggle and GitHub sit on the right. `scrolled` adds the frosted surface;
// without it the bar stays transparent over the hero.
export function SiteHeader({ scrolled = false }: { scrolled?: boolean }) {
	const { dark, toggleTheme } = useTheme();

	return (
		<header
			className={cn(
				`fixed inset-x-0 top-0 z-50 border-b
				transition-[background-color,border-color,backdrop-filter] duration-300`,
				scrolled
					? `border-[oklch(0.922_0_0)] bg-[oklch(0.985_0_0)]/80 backdrop-blur-md
						dark:border-[oklch(0.3_0_0)] dark:bg-[oklch(0.19_0_0)]/80`
					: 'border-transparent bg-transparent'
			)}
		>
			<div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-8">
				<Link className="flex items-center gap-3" to="/">
					<img alt="" className="size-6 rounded-md" src="/madora-icon.png" />
					<span className="font-semibold">Madora</span>
				</Link>
				<nav className="ml-auto flex items-center gap-1">
					<button
						aria-label={dark ? '切换到浅色模式' : '切换到深色模式'}
						className="flex size-8 cursor-pointer items-center justify-center
							rounded-md text-[oklch(0.45_0_0)] transition-colors
							hover:bg-[oklch(0.94_0_0)] hover:text-black
							dark:text-[oklch(0.8_0_0)] dark:hover:bg-[oklch(0.28_0_0)]
							dark:hover:text-white"
						onClick={toggleTheme}
						type="button"
					>
						{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
					</button>
					<a
						aria-label="GitHub"
						className="flex size-8 items-center justify-center rounded-md
							text-[oklch(0.45_0_0)] transition-colors
							hover:bg-[oklch(0.94_0_0)] hover:text-black
							dark:text-[oklch(0.8_0_0)] dark:hover:bg-[oklch(0.28_0_0)]
							dark:hover:text-white"
						href={REPO_URL}
						rel="noreferrer"
						target="_blank"
					>
						<GithubGlyph className="size-[18px]" />
					</a>
				</nav>
			</div>
		</header>
	);
}
