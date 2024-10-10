import {
    type AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
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
const responseInterceptors: [
    (response: AxiosResponse) => any,
    (error: AxiosError) => void,
] = [
    (response: AxiosResponse) => {
        // do something on response data
        const {
            headers,
            data,
        } = response;

        if (!!headers && headers.hasOwnProperty(permissionStore.getTokenKey)) {
            const token: string = headers [permissionStore.getTokenKey] as string;
            permissionStore.setToken(token);
        }

        return data;
    },
    (error: AxiosError): void => {
        const status: undefined | number = error?.status;
        const message: undefined | string = (error?.response?.data as { message?: string })?.message;
        ElMessage({
            message: !!message ? message : error.message,
            grouping: true,
            type: 'error',
        });

        if (status === 401) {

        }
    },
];

export {
    requestInterceptors,
    responseInterceptors,
}