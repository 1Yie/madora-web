import { Github, Menu, Search } from 'lucide-react';

import { fetchHelloWorldTemplate } from '@/api/hello';
import { Button } from '@/components/ui/button';

export function Header() {
	function testApi() {
		fetchHelloWorldTemplate('HelloWorld', true).then((res) => {
			console.log('API Response:', res.message, res.temp);
		});
	}

	return (
		<header
			className="sticky top-0 z-50 w-full border-b border-slate-200/60
				bg-white/80 backdrop-blur-md dark:border-slate-800/60
				dark:bg-slate-950/80"
		>
			<div
				className="container mx-auto flex h-16 items-center justify-between
					px-4"
			>
				<div className="flex items-center gap-8">
					<nav
						className="hidden items-center gap-6 text-sm font-medium
							text-slate-600 md:flex dark:text-slate-400"
					>
						<a
							className="transition-colors hover:text-slate-900
								dark:hover:text-white"
							href="#"
						>
							文档
						</a>
						<a
							className="transition-colors hover:text-slate-900
								dark:hover:text-white"
							href="#"
						>
							组件
						</a>
						<a
							className="transition-colors hover:text-slate-900
								dark:hover:text-white"
							href="#"
						>
							展示
						</a>
					</nav>
				</div>

				<div className="flex items-center gap-2">
					<Button
						className="hidden text-slate-500 sm:flex"
						size="icon"
						variant="ghost"
					>
						<Search className="size-5" />
					</Button>

					<Button size="icon" variant="ghost">
						<a
							href="https://github.com/1Yie/my-react-template"
							rel="noreferrer"
							target="_blank"
						>
							<Github className="size-5" />
						</a>
					</Button>

					<Button className="md:hidden" size="icon" variant="ghost">
						<Menu className="size-5" />
					</Button>

					<div
						className="ml-2 hidden h-5 w-px bg-slate-200 sm:block
							dark:bg-slate-800"
					/>

					<Button
						className="ml-2 hidden rounded-full px-4 sm:flex"
						onClick={testApi}
						size="sm"
						variant="default"
					>
						立即开始
					</Button>
				</div>
			</div>
		</header>
	);
}
