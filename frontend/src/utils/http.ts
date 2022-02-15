import axios, { AxiosInstance, AxiosRequestHeaders, Method } from 'axios';

class HttpClient {
	client: AxiosInstance;
	constructor() {
		this.client = axios.create({
			timeout: 15000,
		});
	}

	async request({ method, url, data, headers, params }: { method: Method, url: string, data?: object, headers?: AxiosRequestHeaders, params?: object }): Promise<any> {
		const response = await this.client({
			method,
			url,
			data,
			params,
			headers,
		});
		return response.data || {}
	}
};

const httpClient = new HttpClient();

export default httpClient;
