import {defineStore} from "pinia";

interface UserInfoStoreInterface {
	tokenKey: string;
	token: string;
}

export const usePermissionStore = defineStore('admin.userinfo', {
	state: (): UserInfoStoreInterface => ({
		tokenKey: 'Token',
		token: '',
	}),
	getters: {
		getTokenKey(): string {
			return this.tokenKey;
		},
		getToken(): string {
			return this.token;
		},
	},
	actions: {
		isLogin(): boolean {
			return !!this.token;
		},
		setToken(value: string): void {
			this.token = value;
		},
	},
	persist: true,
});