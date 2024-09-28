import {defineStore} from "pinia";

interface stateInterface {
	theme: string;
}

export const useAppStore = defineStore('app', {
	state: (): stateInterface => ({
		theme: 'light',

	}),
	actions: {},
	persist: true,
});