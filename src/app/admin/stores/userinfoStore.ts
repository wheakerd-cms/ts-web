import {defineStore} from "pinia";

interface UserInfoStoreInterface {
	authorizationKey: string;
	authorization: null | string;
	tokenKey: string;
	token: null | string;
}

export const useUserInfoStore = defineStore('admin.userinfo', {
	state: (): UserInfoStoreInterface => ({
		authorizationKey: 'Authorization',
		authorization: null,
		tokenKey: 'Token',
		token: null,
	}),
	getters: {
		getAuthorizationKey(): string {
			return this.authorizationKey;
		},
		getAuthorization(): string | null {
			return this.authorization;
		},
		getTokenKey(): string {
			return this.authorizationKey;
		},
		getToken(): string | null {
			return this.authorizationKey;
		},
	},
	actions: {
		isLogin(): boolean {
			return !!this.authorization;
		},
		setAuthorization(value: string): void {
			this.authorization = value;
		},
		setToken(value: string): void {
			this.authorization = value;
		},
	},
	persist: true,
});