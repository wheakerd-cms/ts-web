import {defineStore} from "pinia";
import {computed, type ComputedRef, type Ref, ref} from "vue";

export const usePermissionStore = defineStore('admin.userinfo', () => {

    const tokenKey: string = 'token';
    const getTokenKey: ComputedRef<string> = computed(() => tokenKey);

    const token: Ref<string> = ref('');
    const getToken: ComputedRef<string> = computed(() => token.value);
    const setToken = (value: string): void => {
        token.value = value;
    };

    const isLogin: ComputedRef<boolean> = computed(() => !!getToken.value);

    return {
        tokenKey,
        token,

        getTokenKey,
        getToken,

        setToken,

        isLogin,
    };
}, {
    persist: {
        key: 'admin.permission',
        pick: [
            'tokenKey',
            'token',
        ],
    },
});