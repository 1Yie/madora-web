import { useEffect, useState } from 'react';

export const THEME_KEY = 'madora-landing-theme';

// Light/dark state shared by every landing-style page. The choice is persisted, and
// falls back to the system preference on the first visit.
export function useTheme() {
	const [dark, setDark] = useState(() => {
		if (typeof window === 'undefined') return false;
		const saved = window.localStorage.getItem(THEME_KEY);
		return saved
			? saved === 'dark'
			: window.matchMedia('(prefers-color-scheme: dark)').matches;
	});

	// The shared .dark variables in index.css drive the dark:* utilities.
	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark);
		window.localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
	}, [dark]);

	const toggleTheme = () => setDark((v) => !v);

	return { dark, toggleTheme };
}
