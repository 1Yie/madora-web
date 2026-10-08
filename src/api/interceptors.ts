import { addRequestInterceptor } from '@/api/request';

addRequestInterceptor((url, config) => {
	const token = localStorage.getItem('token');

	if (!token) {
		return [url, config];
	}

	return [
		url,
		{
			...config,
			headers: {
				...config.headers,
				Authorization: `Bearer ${token}`,
			},
		},
	];
});
