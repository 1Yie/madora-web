import { get } from '@/api/request';
import { urls } from '@/api/urls';

interface HelloResponse {
	message: string;
	temp: boolean;
}

export async function fetchHelloWorldTemplate(helloMsg: string, temp: boolean) {
	return get<HelloResponse>(urls.helloWorld.template, {
		params: {
			message: helloMsg,
			temp: temp,
		},
		skipInterceptors: true,
	});
}
