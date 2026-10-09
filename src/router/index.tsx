import { createBrowserRouter } from 'react-router-dom';

import { Landing } from '@/pages/landing';
import { NotFound } from '@/pages/not-found';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Landing />,
	},
	{
		// Any other path falls through to the not-found page.
		path: '*',
		element: <NotFound />,
	},
]);
