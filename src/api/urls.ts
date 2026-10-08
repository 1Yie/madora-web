export const BASE_URL = (() => {
	if (import.meta.env.DEV) {
		return import.meta.env.VITE_BASE_URL || '';
	}

	const dockerPlaceholder = '__VITE_BASE_URL__';

	if (dockerPlaceholder !== '__' + 'VITE_BASE_URL' + '__') {
		return dockerPlaceholder;
	}

	return import.meta.env.VITE_BASE_URL || '';
})();

const combineUrl = (path: string) => {
	const cleanBase = BASE_URL.replace(/\/+$/, '');
	const cleanPath = path.startsWith('/') ? path : `/${path}`;

	const joined = `${cleanBase}${cleanPath}`;

	if (BASE_URL.startsWith('__')) {
		return joined;
	}

	try {
		return new URL(joined).toString();
	} catch {
		return joined;
	}
};

export const urls = {
	helloWorld: {
		template: combineUrl('/hello/world/template'),
	},
} as const;
