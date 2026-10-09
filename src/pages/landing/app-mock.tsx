import type { IconProps } from '@keyline-icons/react';

import { useGSAP } from '@gsap/react';
import {
	ArrowDownUp,
	Bookmark,
	Check,
	ChevronDown,
	ChevronRight,
	Download,
	Eye,
	EyeOff,
	FilePlus,
	FileText,
	Folder,
	FolderOpen,
	FolderPlus,
	FolderTree,
	GitBranch,
	RefreshCw,
	SettingsDot,
	SlidersHorizontal,
	X,
} from '@keyline-icons/react';
import gsap from 'gsap';
import {
	type ReactElement,
	type RefObject,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

import { cn } from '@/lib/utils';

import './mock-prose.css';

const WORKSPACE_PATH = '/home/you/notes/';

// ---- File tree -----------------------------------------------------------

type Badge = 'A' | 'M' | 'S';

type TreeNode = {
	id: string;
	name: string;
	badge?: Badge;
	children?: TreeNode[];
};

const TREE: TreeNode[] = [
	{
		id: 'journal',
		name: 'journal',
		badge: 'A',
		children: [
			{ id: 'j1', name: '2025-10-04.md', badge: 'A' },
			{ id: 'j2', name: '2025-10-07.md', badge: 'S' },
		],
	},
	{
		id: 'projects',
		name: 'projects',
		badge: 'S',
		children: [
			{ id: 'p-sync', name: 'offline-sync.md', badge: 'M' },
			{ id: 'p-cold', name: 'cold-start-plan.md' },
		],
	},
	{
		id: 'reading',
		name: 'reading',
		badge: 'M',
		children: [
			{ id: 'r-crdt', name: 'crdt-notes.md' },
			{
				id: 'r-editor',
				name: 'editor-internals-and-long-title.md',
				badge: 'M',
			},
		],
	},
	{ id: 'readme', name: 'README.md', badge: 'S' },
	{ id: 'todo', name: 'todo.md', badge: 'A' },
];

// Walks the tree so every file is addressable by id.
function flatten(nodes: TreeNode[]): TreeNode[] {
	return nodes.flatMap((n) => [n, ...flatten(n.children ?? [])]);
}

const FILES = flatten(TREE).filter((n) => !n.children);

const BADGE_TONE: Record<Badge, string> = {
	A: 'text-emerald-600',
	M: 'text-amber-600',
	S: 'text-sky-600',
};

// ---- Documents -----------------------------------------------------------

type Line = {
	text: string;
	kind?: 'heading' | 'muted' | 'quote' | 'code';
	active?: boolean;
};

type Block =
	| { tag: 'h1' | 'h2' | 'p' | 'quote'; text: string }
	| { tag: 'hr' }
	| { tag: 'code'; text: string }
	| { tag: 'tasks'; items: { done: boolean; text: string }[] }
	| { tag: 'list'; items: string[] };

// Ghost-text completion for the file: `typed` is what the caret follows,
// `ghost` is the AI continuation shown in grey and accepted with Tab.
type Completion = { typed: string; ghost: string };

type Doc = { lines: Line[]; blocks: Block[]; completion: Completion };

// Each file owns its own source and rendered preview.
const DOCS: Record<string, Doc> = {
	todo: {
		lines: [
			{ text: '# Sprint todo', kind: 'heading', active: true },
			{ text: '' },
			{ text: 'Focus this week: **offline sync** and the editor cold start.' },
			{ text: '' },
			{ text: '## Must do', kind: 'heading' },
			{ text: '' },
			{ text: '- [x] Measure completion latency on the 4 provider' },
			{ text: '- [ ] Benchmark `[[wikilink]]` rendering on 10k files' },
			{ text: '' },
			{ text: '## Next', kind: 'heading' },
			{ text: '' },
		],
		completion: {
			typed: '- Draft conflict policy for offline edits',
			ghost: ', last write wins per block and keep the losing copy',
		},
		blocks: [
			{ tag: 'h1', text: 'Sprint todo' },
			{
				tag: 'p',
				text: 'Focus this week: offline sync and the editor cold start.',
			},
			{ tag: 'h2', text: 'Must do' },
			{
				tag: 'tasks',
				items: [
					{ done: true, text: 'Measure completion latency on the 4 provider' },
					{ done: false, text: 'Benchmark wikilink rendering on 10k files' },
				],
			},
			{ tag: 'h2', text: 'Next' },
			{
				tag: 'tasks',
				items: [
					{ done: false, text: 'Draft conflict policy for offline edits' },
				],
			},
		],
	},
	readme: {
		lines: [
			{ text: '# Notes', kind: 'heading', active: true },
			{ text: '' },
			{ text: 'Personal notes and drafts. Everything here is plain Markdown.' },
			{ text: '' },
			{ text: '## Layout', kind: 'heading' },
			{ text: '' },
			{ text: '- `journal/` daily entries' },
			{ text: '- `projects/` active work' },
		],
		completion: {
			typed: '- `reading/` notes on papers and posts',
			ghost: ' and a short summary after each one',
		},
		blocks: [
			{ tag: 'h1', text: 'Notes' },
			{
				tag: 'p',
				text: 'Personal notes and drafts. Everything here is plain Markdown.',
			},
			{ tag: 'h2', text: 'Layout' },
			{
				tag: 'list',
				items: [
					'journal/ daily entries',
					'projects/ active work',
					'reading/ notes on papers and posts',
				],
			},
		],
	},
	j1: {
		lines: [
			{ text: '# 2025-10-04', kind: 'heading', active: true },
			{ text: '' },
			{ text: 'Spent the morning reading about **CRDT** merge rules.' },
			{ text: '' },
		],
		completion: {
			typed: 'Afternoon: sketch the cache invalidation for offline reads',
			ghost: ' and note which keys must survive a reload',
		},
		blocks: [
			{ tag: 'h1', text: '2025-10-04' },
			{
				tag: 'p',
				text: 'Spent the morning reading about CRDT merge rules.',
			},
			{
				tag: 'p',
				text: 'Afternoon: sketch the cache invalidation for offline reads',
			},
		],
	},
	j2: {
		lines: [
			{ text: '# 2025-10-07', kind: 'heading', active: true },
			{ text: '' },
			{ text: 'Shipped the first offline cache prototype.' },
			{ text: '' },
		],
		completion: {
			typed: 'Tests pass locally; the flaky one is the reconnect case',
			ghost: ', it races with the queued writes',
		},
		blocks: [
			{ tag: 'h1', text: '2025-10-07' },
			{ tag: 'p', text: 'Shipped the first offline cache prototype.' },
			{
				tag: 'p',
				text: 'Tests pass locally; the flaky one is the reconnect case',
			},
		],
	},
	'p-sync': {
		lines: [
			{ text: '# Offline sync', kind: 'heading', active: true },
			{ text: '' },
			{ text: 'Edits stay local until the device reconnects.' },
			{ text: '' },
			{ text: '```' },
			{ text: 'merge(local, remote) -> last-writer-wins per block' },
			{ text: '```' },
			{ text: '' },
		],
		completion: {
			typed: 'Open question: how do we surface a lost write to the user',
			ghost: ' without blocking the editor?',
		},
		blocks: [
			{ tag: 'h1', text: 'Offline sync' },
			{ tag: 'p', text: 'Edits stay local until the device reconnects.' },
			{
				tag: 'code',
				text: 'merge(local, remote) -> last-writer-wins per block',
			},
			{
				tag: 'p',
				text: 'Open question: how do we surface a lost write to the user',
			},
		],
	},
	'p-cold': {
		lines: [
			{ text: '# Cold start plan', kind: 'heading', active: true },
			{ text: '' },
			{ text: 'Defer the Mermaid and KaTeX bundles until first render.' },
			{ text: '' },
		],
		completion: {
			typed: 'Measure first paint on a 4-year-old laptop before and after',
			ghost: ' the split, and record the numbers in the sprint doc.',
		},
		blocks: [
			{ tag: 'h1', text: 'Cold start plan' },
			{
				tag: 'p',
				text: 'Defer the Mermaid and KaTeX bundles until first render.',
			},
			{
				tag: 'p',
				text: 'Measure first paint on a 4-year-old laptop before and after',
			},
		],
	},
	'r-crdt': {
		lines: [
			{ text: '# CRDT notes', kind: 'heading', active: true },
			{ text: '' },
			{ text: 'Sequence CRDTs keep insertion order without a central server.' },
			{ text: '' },
		],
		completion: {
			typed: 'The tradeoff is metadata: every character carries a unique id',
			ghost: ', which grows with the length of the document.',
		},
		blocks: [
			{ tag: 'h1', text: 'CRDT notes' },
			{
				tag: 'p',
				text: 'Sequence CRDTs keep insertion order without a central server.',
			},
			{
				tag: 'p',
				text: 'The tradeoff is metadata: every character carries a unique id',
			},
		],
	},
	'r-editor': {
		lines: [
			{ text: '# Editor internals', kind: 'heading', active: true },
			{ text: '' },
			{
				text: 'Decorations are cheaper than rebuilding the whole document tree.',
			},
		],
		completion: {
			typed: 'Ghost text is a decoration too, so it never touches the document',
			ghost: ' until the user accepts it with Tab.',
		},
		blocks: [
			{ tag: 'h1', text: 'Editor internals' },
			{
				tag: 'p',
				text: 'Decorations are cheaper than rebuilding the whole document tree.',
			},
			{
				tag: 'p',
				text: 'Ghost text is a decoration too, so it never touches the document',
			},
		],
	},
};

const GUTTER_LINES = 30;

// ---- Small pieces --------------------------------------------------------

// Icon-only control used in the sidebar toolbar and the bottom git bar.
function ToolIcon({
	active = false,
	className,
	icon: Icon,
	label,
	onClick,
}: {
	active?: boolean;
	className?: string;
	icon: (props: IconProps) => ReactElement;
	label?: string;
	onClick?: () => void;
}) {
	return (
		<button
			aria-label={label}
			className={cn(
				`flex size-7 shrink-0 cursor-pointer items-center justify-center
				rounded-md transition-colors`,
				active
					? 'bg-[#3b82f6] text-white'
					: `text-[oklch(0.45_0_0)] dark:text-[oklch(0.8_0_0)]
						hover:bg-[oklch(0.94_0_0)] dark:hover:bg-white/10`,
				className
			)}
			onClick={onClick}
			type="button"
		>
			<Icon className="size-4" />
		</button>
	);
}

// ---- Tab strip -----------------------------------------------------------

// Horizontally scrolling tab strip, modelled on tab-bar.tsx in scroll mode:
// wheel drives the scroll, edge shadows show when more tabs are hidden, and
// the active tab is scrolled into view.
function TabStrip({
	activeId,
	onActivate,
	onClose,
	openTabs,
}: {
	activeId: string;
	onActivate: (id: string) => void;
	onClose: (id: string) => void;
	openTabs: string[];
}) {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [showLeftShadow, setShowLeftShadow] = useState(false);
	const [showRightShadow, setShowRightShadow] = useState(false);

	useLayoutEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const update = () => {
			setShowLeftShadow(el.scrollLeft > 2);
			setShowRightShadow(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
		};

		const onWheel = (e: WheelEvent) => {
			if (el.scrollWidth <= el.clientWidth) return;
			let delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
			if (delta === 0) return;
			if (e.deltaMode === 1) delta *= 16;
			else if (e.deltaMode === 2) delta *= el.clientWidth;
			e.preventDefault();
			el.scrollLeft += delta;
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(el);
		el.addEventListener('scroll', update);
		el.addEventListener('wheel', onWheel, { passive: false });

		return () => {
			el.removeEventListener('scroll', update);
			el.removeEventListener('wheel', onWheel);
			observer.disconnect();
		};
	}, []);

	// Keep the active tab visible, same rule as tab-bar.tsx.
	useLayoutEffect(() => {
		const el = scrollRef.current;
		const btn = el?.querySelector<HTMLElement>('[aria-selected="true"]');
		if (!el || !btn) return;
		const left = btn.offsetLeft;
		const right = left + btn.offsetWidth;
		if (left < el.scrollLeft) el.scrollLeft = Math.max(0, left - 8);
		else if (right > el.scrollLeft + el.clientWidth)
			el.scrollLeft = right - el.clientWidth + 8;
	}, [activeId, openTabs]);

	return (
		<div
			className="relative h-8 shrink-0 border-b border-[oklch(0.922_0_0)]
				dark:border-white/10 bg-[oklch(0.97_0_0)]/40 dark:bg-[oklch(0.205_0_0)]"
		>
			<div
				className="h-full overflow-x-auto [scrollbar-width:none]
					[&::-webkit-scrollbar]:hidden"
				ref={scrollRef}
				role="tablist"
			>
				<div className="flex h-full w-max items-stretch">
					{openTabs.map((id) => {
						const file = FILES.find((f) => f.id === id);
						const active = id === activeId;
						return (
							<div
								aria-selected={active}
								className={cn(
									`group flex max-w-56 shrink-0 cursor-pointer items-center
									gap-2 border-r border-[oklch(0.922_0_0)] dark:border-white/10
									px-3 font-mono text-[12px]`,
									active
										? `bg-white text-[oklch(0.145_0_0)]
											dark:text-[oklch(0.985_0_0)] dark:bg-[oklch(0.19_0_0)]`
										: `text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)]
											hover:bg-[oklch(0.95_0_0)] dark:hover:bg-white/10`
								)}
								key={id}
								onClick={() => onActivate(id)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') onActivate(id);
								}}
								role="tab"
								tabIndex={0}
							>
								<FileText className="size-3.5 shrink-0" />
								<span className="truncate">{file?.name}</span>
								<button
									aria-label={`关闭 ${file?.name}`}
									className="ml-1 flex size-4 shrink-0 items-center
										justify-center rounded hover:bg-[oklch(0.9_0_0)]"
									onClick={(e) => {
										e.stopPropagation();
										onClose(id);
									}}
									type="button"
								>
									<X className="size-3" />
								</button>
							</div>
						);
					})}
				</div>
			</div>
			{/* Edge shadows appear only when tabs are hidden on that side. */}
			<div
				className="pointer-events-none absolute inset-y-0 left-0 w-6
					bg-gradient-to-r from-black/8 to-transparent transition-opacity
					duration-150"
				style={{ opacity: showLeftShadow ? 1 : 0 }}
			/>
			<div
				className="pointer-events-none absolute inset-y-0 right-0 w-6
					bg-gradient-to-l from-black/8 to-transparent transition-opacity
					duration-150"
				style={{ opacity: showRightShadow ? 1 : 0 }}
			/>
		</div>
	);
}

// ---- Completion loader ---------------------------------------------------

// Mirrors MathCurveLoader in src/components/ui/math-curve-loader.tsx: three dots
// on a 3-lobed orbit, each with a fading trail, slowly rotating.
const SVG_NS = 'http://www.w3.org/2000/svg';
const LOADER_TRAIL = 4;
const LOADER_DOTS = 3;

function orbitPoint(progress: number) {
	const t = progress * Math.PI * 2;
	const r = 17 + 7 * Math.cos(3 * t);
	return { x: 27 + r * Math.cos(t), y: 27 + r * Math.sin(t) };
}

function CompletionLoader({
	visibleRef,
}: {
	visibleRef: RefObject<HTMLDivElement | null>;
}) {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = svgRef.current;
		if (!svg) return;

		const groups: SVGGElement[] = [];
		const dots: SVGCircleElement[][] = [];
		for (let d = 0; d < LOADER_DOTS; d++) {
			const group = document.createElementNS(SVG_NS, 'g');
			svg.appendChild(group);
			groups.push(group);
			const particles: SVGCircleElement[] = [];
			for (let i = 0; i < LOADER_TRAIL; i++) {
				const circle = document.createElementNS(SVG_NS, 'circle');
				circle.setAttribute('fill', 'currentColor');
				const size = i === 0 ? 3 : 3 * (1 - i / (LOADER_TRAIL * 2));
				circle.setAttribute('r', String(size));
				group.appendChild(circle);
				particles.push(circle);
			}
			dots.push(particles);
		}

		const DURATION_MS = 3000;
		const ROTATION_MS = 18000;
		const startedAt = performance.now();
		let frameId = 0;

		const render = (time: number) => {
			const elapsed = time - startedAt;
			const rotation = -((elapsed % ROTATION_MS) / ROTATION_MS) * 360;
			const progress = (elapsed % DURATION_MS) / DURATION_MS;

			for (let d = 0; d < LOADER_DOTS; d++) {
				const dotProgress = (progress + d / LOADER_DOTS) % 1;
				groups[d]?.setAttribute('transform', `rotate(${rotation} 27 27)`);
				for (let i = 0; i < LOADER_TRAIL; i++) {
					const tail = i / (LOADER_TRAIL - 1);
					const p = orbitPoint(dotProgress - tail * 0.06);
					const node = dots[d]?.[i];
					if (!node) continue;
					node.setAttribute('cx', p.x.toFixed(2));
					node.setAttribute('cy', p.y.toFixed(2));
					node.setAttribute(
						'opacity',
						(0.2 + Math.pow(1 - tail, 0.6) * 0.8).toFixed(3)
					);
				}
			}
			frameId = requestAnimationFrame(render);
		};
		frameId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(frameId);
			for (const g of groups) svg.removeChild(g);
		};
	}, []);

	return (
		// Anchored to the caret's bottom-right corner, like the editor's completion tooltip
		// (left: caret + 6px, top: caret bottom - 6px). Faded in by the timeline.
		<div
			className="pointer-events-none absolute top-full left-1.5 -mt-1.5
				opacity-0"
			ref={visibleRef}
			style={{ transform: 'translateY(0)' }}
		>
			<div
				className="flex size-7 items-center justify-center rounded-full
					bg-white/60 shadow-sm backdrop-blur-sm dark:bg-[oklch(0.19_0_0)]/60"
			>
				<svg
					aria-hidden="true"
					className="size-5 text-[#2563eb]"
					fill="none"
					ref={svgRef}
					viewBox="0 0 54 54"
				/>
			</div>
		</div>
	);
}

// ---- Component -----------------------------------------------------------

export function AppMock() {
	const windowRef = useRef<HTMLDivElement>(null);
	const typedRef = useRef<HTMLSpanElement>(null);
	const ghostRef = useRef<HTMLSpanElement>(null);
	const caretRef = useRef<HTMLSpanElement>(null);
	const keyRef = useRef<HTMLSpanElement>(null);
	const loaderRef = useRef<HTMLDivElement>(null);
	// Bumped on every run of the ghost-text effect; stale timelines check it before writing.
	const runRef = useRef(0);

	const [expanded, setExpanded] = useState<Set<string>>(
		() => new Set(['journal', 'projects', 'reading'])
	);
	const [openTabs, setOpenTabs] = useState<string[]>([
		'readme',
		'todo',
		'r-crdt',
	]);
	const [activeId, setActiveId] = useState('todo');
	const [selectedId, setSelectedId] = useState('todo');
	const [preview, setPreview] = useState(false);

	const activeDoc = DOCS[activeId];
	const completion: Completion = activeDoc?.completion ?? {
		typed: '',
		ghost: '',
	};

	// The completion is accepted at the end of the document, so the preview appends the
	// ghost continuation to the last text item (last block, and last item for lists and
	// task lists). Every file uses this one rule, so no text matching is involved.
	// blockIndex: which block; itemIndex/itemCount: position within a list (paragraphs pass 0/0).
	const ghostAt = (
		blockIndex: number,
		itemIndex: number,
		itemCount: number
	) => {
		const lastBlock = (activeDoc?.blocks.length ?? 0) - 1;
		if (blockIndex !== lastBlock || !completion.ghost) return '';
		const isLastItem = itemCount === 0 || itemIndex === itemCount - 1;
		return isLastItem ? completion.ghost : '';
	};

	const toggleFolder = (id: string) =>
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});

	const openFile = (id: string) => {
		setSelectedId(id);
		setActiveId(id);
		setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
	};

	const closeTab = (id: string) => {
		setOpenTabs((tabs) => {
			const next = tabs.filter((t) => t !== id);
			if (id === activeId && next.length > 0) {
				setActiveId(next[next.length - 1] ?? '');
			}
			return next;
		});
	};

	// Ghost-text demo only runs on todo.md, the file that is open by default.
	useGSAP(
		() => {
			const reduce = window.matchMedia(
				'(prefers-reduced-motion: reduce)'
			).matches;

			const typedEl = typedRef.current;
			const ghostEl = ghostRef.current;
			const caretEl = caretRef.current;
			const keyEl = keyRef.current;
			const loaderEl = loaderRef.current;
			if (!typedEl || !ghostEl || !caretEl || !keyEl || !loaderEl) return;

			// The completion belongs to whichever file is active.
			const TYPED = completion.typed;
			const GHOST = completion.ghost;

			if (reduce) {
				typedEl.textContent = TYPED;
				ghostEl.textContent = GHOST;
				return;
			}

			// Clear leftovers from the previous file before the new loop starts.
			typedEl.textContent = '';
			ghostEl.textContent = '';
			const runId = ++runRef.current;
			const isCurrent = () => runRef.current === runId;
			const progress = { n: 0, g: 0 };
			const render = () => {
				if (!isCurrent()) return;
				typedEl.textContent = TYPED.slice(0, Math.round(progress.n));
				ghostEl.textContent = GHOST.slice(0, Math.round(progress.g));
			};

			const blink = gsap.to(caretEl, {
				duration: 0.5,
				ease: 'steps(1)',
				opacity: 0,
				repeat: -1,
				yoyo: true,
			});

			// Plays once per file: type, suggest, accept, then rest on the accepted line.
			const tl = gsap
				.timeline()
				.set(progress, { n: 0, g: 0 }, 0)
				// Reset the typed line each loop so accepted text does not pile up.
				.call(
					() => {
						typedEl.textContent = '';
						ghostEl.textContent = '';
					},
					[],
					0
				)
				.set(keyEl, { opacity: 0 }, 0)
				// Request pending: show the loader at the cursor, like the editor's completion tooltip.
				.set(loaderEl, { opacity: 0 }, 0)
				.to(loaderEl, { duration: 0.2, opacity: 1 }, 0.1)
				.to(
					progress,
					{ duration: 0.7, ease: 'none', n: TYPED.length, onUpdate: render },
					0.4
				)
				.to(
					progress,
					{ duration: 1.4, ease: 'none', g: GHOST.length, onUpdate: render },
					1.2
				)
				.to(loaderEl, { duration: 0.15, opacity: 0 }, 1.1)
				.to(keyEl, { duration: 0.2, opacity: 1 }, 2.6)
				.call(
					() => {
						if (!isCurrent()) return;
						typedEl.textContent = TYPED + GHOST;
						ghostEl.textContent = '';
					},
					[],
					3
				)
				.to(keyEl, { duration: 0.3, opacity: 0 }, 3.4);

			// Kill both the caret blink and the timeline so switching files never leaves
			// a stale loop writing into the line.
			return () => {
				tl.kill();
				blink.kill();
			};
		},
		{ dependencies: [preview, activeId], scope: windowRef }
	);

	// Subtle pointer tilt on the whole window.
	useGSAP(
		() => {
			const el = windowRef.current;
			if (!el) return;
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

			const rotX = gsap.quickTo(el, 'rotateX', {
				duration: 0.8,
				ease: 'power3',
			});
			const rotY = gsap.quickTo(el, 'rotateY', {
				duration: 0.8,
				ease: 'power3',
			});
			const onMove = (e: MouseEvent) => {
				rotY((e.clientX / window.innerWidth - 0.5) * 5);
				rotX(-(e.clientY / window.innerHeight - 0.5) * 3);
			};
			window.addEventListener('mousemove', onMove);
			return () => window.removeEventListener('mousemove', onMove);
		},
		{ scope: windowRef }
	);

	const renderTree = (nodes: TreeNode[], depth: number): ReactElement[] =>
		nodes.flatMap((node) => {
			const isFolder = Boolean(node.children);
			const isOpen = expanded.has(node.id);
			const isSelected = selectedId === node.id;
			// Same structure as file-explorer-sidebar.tsx: indentation guides for each
			// ancestor depth sit behind the row (z-0), the row content sits above (z-10).
			const row = (
				<li className="relative" key={node.id}>
					{Array.from({ length: depth }, (_, i) => (
						<div
							className="pointer-events-none absolute top-0 z-0 w-px
								bg-[oklch(0.922_0_0)] dark:bg-white/10"
							key={`g-${i}`}
							style={{ height: '100%', left: `${i * 14 + 18}px` }}
						/>
					))}
					<button
						className={cn(
							`relative z-10 flex w-full cursor-pointer items-center gap-1
							py-1.5 pr-3 text-left text-sm transition-colors`,
							isSelected
								? `bg-[#dbeafe] text-[oklch(0.145_0_0)] dark:bg-[#2563eb]/30
									dark:text-[oklch(0.985_0_0)]`
								: `text-[oklch(0.25_0_0)] dark:text-[oklch(0.9_0_0)]
									hover:bg-[oklch(0.95_0_0)] dark:hover:bg-white/10`
						)}
						onClick={() =>
							isFolder ? toggleFolder(node.id) : openFile(node.id)
						}
						style={{
							paddingLeft: isFolder ? depth * 14 + 8 : depth * 14 + 32,
						}}
						type="button"
					>
						{isFolder ? (
							<span
								className="flex size-5 shrink-0 items-center justify-center
									rounded-sm text-[oklch(0.45_0_0)] dark:text-[oklch(0.8_0_0)]"
							>
								{isOpen ? (
									<ChevronDown className="size-4 shrink-0" />
								) : (
									<ChevronRight className="size-4 shrink-0" />
								)}
							</span>
						) : null}
						{isFolder ? (
							isOpen ? (
								<FolderOpen
									className="size-4 shrink-0 text-[oklch(0.45_0_0)]
										dark:text-[oklch(0.8_0_0)]"
								/>
							) : (
								<Folder
									className="size-4 shrink-0 text-[oklch(0.45_0_0)]
										dark:text-[oklch(0.8_0_0)]"
								/>
							)
						) : (
							<FileText
								className="size-4 shrink-0 text-[oklch(0.45_0_0)]
									dark:text-[oklch(0.8_0_0)]"
							/>
						)}
						<span className="ml-1.5 min-w-0 flex-1 truncate">{node.name}</span>
						{node.badge ? (
							<span
								className={cn(
									'ml-1 shrink-0 font-mono text-[11px] font-semibold',
									BADGE_TONE[node.badge]
								)}
							>
								{node.badge}
							</span>
						) : null}
					</button>
				</li>
			);
			return isFolder && isOpen
				? [row, ...renderTree(node.children ?? [], depth + 1)]
				: [row];
		});

	return (
		<div
			className="relative mx-auto w-full max-w-[1120px]"
			ref={windowRef}
			style={{ perspective: 1800 }}
		>
			<div
				className="flex h-[min(860px,86dvh)] min-h-[600px] overflow-hidden
					rounded-xl border border-black/10 bg-white text-[oklch(0.145_0_0)]
					dark:text-[oklch(0.985_0_0)] dark:border-white/10
					dark:bg-[oklch(0.19_0_0)] dark:text-[oklch(0.985_0_0)]
					shadow-[0_30px_80px_-24px_rgba(0,0,0,0.5)]"
				style={{ transformStyle: 'preserve-3d' }}
			>
				{/* Sidebar, mirrors file-explorer-sidebar.tsx */}
				<aside
					className="hidden w-[296px] shrink-0 flex-col border-r
						border-[oklch(0.922_0_0)] dark:border-white/10 bg-[oklch(0.985_0_0)]
						md:flex dark:border-white/10 dark:bg-[oklch(0.205_0_0)]"
				>
					{/* Sidebar header: traffic lights sit beside the app mark on one row */}
					<div className="flex shrink-0 items-center gap-2.5 px-4 pt-3 pb-3">
						<div className="flex items-center gap-2">
							<span className="size-3 rounded-full bg-[#ff5f57]" />
							<span className="size-3 rounded-full bg-[#febc2e]" />
							<span className="size-3 rounded-full bg-[#28c840]" />
						</div>
						<img
							alt=""
							className="size-6 rounded-md"
							draggable={false}
							src="/madora-icon.png"
						/>
						<span className="text-[15px] font-semibold">Madora</span>
						<FolderOpen
							className="ml-auto size-[18px] text-[oklch(0.45_0_0)]
								dark:text-[oklch(0.8_0_0)]"
						/>
					</div>
					<div
						className="truncate px-4 pt-1 pb-2.5 font-mono text-xs
							text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)]"
					>
						{WORKSPACE_PATH}
					</div>

					{/* Toolbar: bordered top and bottom */}
					<div
						className="flex items-center gap-1 border-y
							border-[oklch(0.922_0_0)] dark:border-white/10 px-2 py-2
							text-[oklch(0.45_0_0)] dark:text-[oklch(0.8_0_0)]"
					>
						<ToolIcon icon={FolderPlus} label="新建文件夹" />
						<ToolIcon icon={FilePlus} label="新建文件" />
						<span
							className="mx-1 h-5 w-px bg-[oklch(0.922_0_0)] dark:bg-white/10"
						/>
						<ToolIcon active icon={ArrowDownUp} label="排序" />
						<ToolIcon icon={FolderTree} label="树形视图" />
						<ToolIcon icon={FileText} label="只看 Markdown" />
						<ToolIcon icon={Bookmark} label="收藏" />
						<ToolIcon className="ml-auto" icon={RefreshCw} label="刷新" />
					</div>

					<ul className="min-h-0 flex-1 overflow-hidden py-1">
						{renderTree(TREE, 0)}
					</ul>

					{/* Bottom git bar, same 40px height as the status bar */}
					<div
						className="flex h-10 shrink-0 items-center gap-0.5 border-t
							border-[oklch(0.922_0_0)] dark:border-white/10 px-2
							text-[oklch(0.45_0_0)] dark:text-[oklch(0.8_0_0)]"
					>
						<ToolIcon icon={SlidersHorizontal} label="过滤" />
						{/* Branch label and summary, sized like StatusLabels in git-panel.tsx */}
						<span
							className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden
								px-2 font-mono text-xs"
						>
							<GitBranch className="size-3.5 shrink-0 text-[#0ea5e9]" />
							<span
								className="max-w-[45%] shrink truncate font-semibold
									text-[oklch(0.145_0_0)] dark:text-[oklch(0.985_0_0)]"
							>
								main
							</span>
							<span
								className="min-w-0 flex-1 truncate text-[oklch(0.556_0_0)]
									dark:text-[oklch(0.708_0_0)]"
							>
								↑1 ↓0 · 3 changed
							</span>
						</span>
						<ToolIcon className="ml-auto" icon={Download} label="拉取" />
						<ToolIcon icon={Check} label="提交" />
						<ToolIcon icon={SettingsDot} label="设置" />
						<ToolIcon icon={RefreshCw} label="同步" />
					</div>
				</aside>

				<div className="flex min-w-0 flex-1 flex-col">
					<TabStrip
						activeId={activeId}
						onActivate={(id) => {
							setActiveId(id);
							setSelectedId(id);
						}}
						onClose={closeTab}
						openTabs={openTabs}
					/>

					{/* Editor or rendered preview of the active file */}
					{preview ? (
						<div
							className="mock-prose min-h-0 flex-1 overflow-hidden bg-white
								px-10 pt-6 text-[15px] dark:bg-[oklch(0.19_0_0)]"
						>
							{activeDoc?.blocks.map((block, i) => {
								if (block.tag === 'h1') return <h1 key={i}>{block.text}</h1>;
								if (block.tag === 'h2') return <h2 key={i}>{block.text}</h2>;
								if (block.tag === 'p')
									return (
										<p key={i}>
											{block.text}
											{ghostAt(i, -1, 0)}
										</p>
									);
								if (block.tag === 'quote')
									return <blockquote key={i}>{block.text}</blockquote>;
								if (block.tag === 'code')
									return (
										<div
											className="my-6 overflow-auto rounded-lg border
												border-[oklch(0.922_0_0)] bg-[oklch(0.97_0_0)]
												dark:border-white/10 dark:bg-[oklch(0.269_0_0)]"
											key={i}
										>
											<pre
												className="m-0 bg-transparent px-4 py-4 font-mono
													text-sm leading-relaxed whitespace-pre-wrap
													break-words"
											>
												{block.text}
											</pre>
										</div>
									);
								if (block.tag === 'hr')
									return (
										<hr
											className="my-5 border-[oklch(0.922_0_0)]
												dark:border-white/10"
											key={i}
										/>
									);
								if (block.tag === 'list')
									return (
										<ul className="my-3 list-disc pl-5" key={i}>
											{block.items.map((item, idx) => (
												<li key={item}>
													{item}
													{ghostAt(i, idx, block.items.length)}
												</li>
											))}
										</ul>
									);
								if (block.tag !== 'tasks') return null;
								return (
									<ul className="my-3 flex flex-col gap-1.5" key={i}>
										{block.items.map((item, idx) => (
											<li className="flex items-center gap-2" key={item.text}>
												<span
													className={cn(
														`inline-flex size-4 items-center justify-center
															rounded border`,
														item.done
															? 'border-[#2563eb] bg-[#2563eb] text-white'
															: 'border-[oklch(0.7_0_0)]'
													)}
												>
													{item.done ? <Check className="size-3" /> : null}
												</span>
												<span
													className={cn(
														item.done &&
															`text-[oklch(0.556_0_0)]
																dark:text-[oklch(0.708_0_0)] line-through`
													)}
												>
													{item.text}
													{ghostAt(i, idx, block.items.length)}
												</span>
											</li>
										))}
									</ul>
								);
							})}
						</div>
					) : (
						<div
							className="flex min-h-0 flex-1 overflow-hidden bg-white font-mono
								dark:bg-[oklch(0.19_0_0)] text-[14px] leading-6"
						>
							<div
								className="w-12 shrink-0 pt-3 pr-3 text-right
									text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)]
									select-none border-r border-[oklch(0.922_0_0)]
									dark:border-white/10"
							>
								{Array.from({ length: GUTTER_LINES }, (_, i) => (
									<div
										className={cn(
											'h-6 pr-1',
											activeDoc?.lines[i]?.kind === 'heading' &&
												'text-[#2563eb]'
										)}
										key={i + 1}
									>
										{i + 1}
									</div>
								))}
							</div>
							<div className="min-w-0 flex-1 pt-3 pr-6 pl-4">
								{activeDoc?.lines.map((line, i) => (
									<div
										className={cn(
											'h-6 truncate',
											line.active && 'bg-[#eaf2fd] dark:bg-[#2563eb]/20',
											line.kind === 'heading' &&
												'text-[#2563eb] dark:text-[#93c5fd]',
											line.kind === 'muted' &&
												'text-[oklch(0.556_0_0)] dark:text-[oklch(0.708_0_0)]',
											line.kind === 'quote' &&
												'text-[oklch(0.4_0_0)] dark:text-[oklch(0.8_0_0)]'
										)}
										key={i}
									>
										{line.text}
									</div>
								))}
								{activeDoc ? (
									<div
										className="min-h-6 leading-6 whitespace-normal break-words"
									>
										<span ref={typedRef} />
										<span className="text-[oklch(0.7_0_0)]" ref={ghostRef} />
										<span className="relative inline-block align-middle">
											<span
												className="ml-px inline-block h-5 w-[2px]
													bg-[oklch(0.145_0_0)] align-middle"
												ref={caretRef}
											/>
											<CompletionLoader visibleRef={loaderRef} />
										</span>
										<span
											className="ml-3 inline-block rounded border
												border-[oklch(0.922_0_0)] dark:border-white/10 px-1.5
												align-middle text-[11px] text-[oklch(0.556_0_0)]
												dark:text-[oklch(0.708_0_0)]"
											ref={keyRef}
										>
											Tab
										</span>
									</div>
								) : null}
							</div>
						</div>
					)}

					{/* Status bar: full info while editing; only the view toggle in preview */}
					<div
						className={cn(
							`flex h-10 shrink-0 items-center gap-4 border-t
							border-[oklch(0.922_0_0)] bg-[oklch(0.985_0_0)] px-3 text-xs
							text-[oklch(0.556_0_0)] dark:border-white/10
							dark:bg-[oklch(0.205_0_0)] dark:text-[oklch(0.708_0_0)]`,
							preview && 'justify-end px-2'
						)}
					>
						{!preview && (
							<>
								<span>编辑文本自动保存</span>
								<span className="ml-auto font-mono">行 1, 列 1</span>
								<span className="font-mono">UTF-8</span>
								<span className="font-mono">LF</span>
							</>
						)}
						<ToolIcon
							className="size-6"
							icon={preview ? EyeOff : Eye}
							label={preview ? '切换到编辑' : '切换到预览'}
							onClick={() => setPreview((v) => !v)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
