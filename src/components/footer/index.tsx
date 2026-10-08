import { Github, BookOpen, Heart, Code, ExternalLink } from 'lucide-react';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className="border-t border-slate-200 bg-slate-50/50 px-6 py-12 md:px-12
				dark:border-slate-800 dark:bg-slate-900/50"
		>
			<div className="mx-auto max-w-6xl">
				<div className="grid gap-8 md:grid-cols-3">
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<Code className="size-6 text-slate-600 dark:text-slate-400" />
							<span
								className="text-lg font-semibold text-slate-900
									dark:text-slate-100"
							>
								Ichiyo Template
							</span>
						</div>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							基于 React Compiler 与 Tailwind v4 构建的高性能现代化开发环境。
						</p>
					</div>

					<div className="space-y-4">
						<h3
							className="text-sm font-semibold text-slate-900
								dark:text-slate-100"
						>
							快速链接
						</h3>
						<div className="grid gap-2">
							{[
								{
									label: '文档',
									href: '#',
									icon: <BookOpen className="size-4" />,
								},
								{
									label: 'GitHub',
									href: 'https://github.com/1Yie/my-react-template',
									icon: <Github className="size-4" />,
									external: true,
								},
								{
									label: 'React',
									href: 'https://react.dev',
									icon: <ExternalLink className="size-4" />,
									external: true,
								},
								{
									label: 'Tailwind CSS',
									href: 'https://tailwindcss.com',
									icon: <ExternalLink className="size-4" />,
									external: true,
								},
							].map((link) => (
								<a
									className="flex items-center gap-2 text-sm text-slate-500
										transition-colors hover:text-slate-900 dark:text-slate-400
										dark:hover:text-slate-100"
									href={link.href}
									key={link.label}
									rel={link.external ? 'noopener noreferrer' : undefined}
									target={link.external ? '_blank' : undefined}
								>
									{link.icon}
									{link.label}
									{link.external && (
										<ExternalLink className="size-3 opacity-50" />
									)}
								</a>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<h3
							className="text-sm font-semibold text-slate-900
								dark:text-slate-100"
						>
							社区与支持
						</h3>
						<div
							className="space-y-2 text-sm text-slate-500 dark:text-slate-400"
						>
							<p>如果这个项目对你有帮助，请给我们一个 ⭐ Star</p>
							<p>
								发现问题？欢迎提交{' '}
								<a
									className="text-slate-700 underline hover:text-slate-900
										dark:text-slate-300 dark:hover:text-slate-100"
									href="https://github.com/1Yie/my-react-template/issues"
									rel="noopener noreferrer"
									target="_blank"
								>
									Issue
								</a>
							</p>
						</div>
					</div>
				</div>

				<div
					className="mt-8 flex flex-col items-center justify-between gap-4
						border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-800"
				>
					<div
						className="flex items-center gap-1 text-sm text-slate-400
							dark:text-slate-500"
					>
						<span>© {currentYear} Ichiyo Project.</span>
						<span>Built with</span>
						<Heart className="size-4 fill-red-500 text-red-500" />
						<span>using React & Tailwind CSS</span>
					</div>
					<div
						className="flex items-center gap-4 text-xs text-slate-400
							dark:text-slate-500"
					>
						<span>MIT License</span>
						<span>•</span>
						<span>1.0.0</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
