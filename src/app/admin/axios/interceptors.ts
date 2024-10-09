import {
	type AxiosResponse,
	type InternalAxiosRequestConfig,
	type RawAxiosResponseHeaders,
} from "axios";
import {usePermissionStore} from "@/app/admin/stores/permissionStore";
import {ElMessage} from "element-plus";
import {SUCCESS_CODE} from "@/app/admin/axios/config";

const permissionStore = usePermissionStore();

// request interceptor
const requestInterceptors = (config: InternalAxiosRequestConfig<any>) => {
	if (!!permissionStore.getToken) {
		config.headers [permissionStore.getTokenKey] = permissionStore.getToken;
	}

	return config;
};

// response interceptor
const responseInterceptors = (response: AxiosResponse) => {
	// do something on response data
	const {headers, status, data}: {
		headers: RawAxiosResponseHeaders;
		status: number;
		data: any;
	} = response;

	const token: undefined | null | string = headers [permissionStore.getTokenKey] as undefined | null | string;

	if (!!token) {
		permissionStore.setToken(token);
	}

	if (status === SUCCESS_CODE) {
		return data;
	}

	ElMessage({
		message: data.message,
		grouping: true,
		type: 'error',
	});
};

export {
	requestInterceptors,
	responseInterceptors,
}