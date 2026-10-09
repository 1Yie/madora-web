import { useEffect, useSyncExternalStore } from 'react';

export const THEME_KEY = 'madora-landing-theme';

// One module-level store, so every useTheme() caller sees the same value and a toggle
// in one component (e.g. the header) re-renders the others right away.
let dark: boolean | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

// Persisted choice wins; on the first visit fall back to the system preference.
function getSnapshot() {
	if (dark === null) {
		const saved = window.localStorage.getItem(THEME_KEY);
		dark = saved
			? saved === 'dark'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return dark;
}

function setDark(next: boolean) {
	dark = next;
	listeners.forEach((listener) => listener());
}

// Light/dark state shared by every landing-style page. The choice is persisted.
export function useTheme() {
	const isDark = useSyncExternalStore(subscribe, getSnapshot, () => false);

	// The shared .dark variables in index.css drive the dark:* utilities.
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
		window.localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
	}, [isDark]);

	const toggleTheme = () => setDark(!getSnapshot());

	return { dark: isDark, toggleTheme };
}
