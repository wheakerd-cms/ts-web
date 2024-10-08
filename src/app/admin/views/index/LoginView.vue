<script setup lang="ts">
import {type Reactive, reactive} from "vue";
import {defineRoutes} from "@/app/admin/stores/permissionStore";
import type {RouteRecordRaw} from "vue-router";
import router from "@/router";
import {useUserInfoStore} from "@/app/admin/stores/userinfoStore";
import {useRouterStoreWithout} from "@/app/admin/stores/routerStore";

const routerStore = useRouterStoreWithout();
const userInfoStore = useUserInfoStore();

interface formInterface {
	username: string | null,
	password: string | null,
}

const form: Reactive<formInterface> = reactive({
	username: null,
	password: null,
});

const onSubmit = async () => {

	// login
	userInfoStore.setAuthorization('authorization');
	userInfoStore.setToken('token');

	routerStore.setAddRouters(defineRoutes as RouteRecordRaw []);
	await routerStore.generateRoutes();
	routerStore.getRouters.forEach((route: RouteRecordRaw) => {
		router.addRoute(route);
	});
	routerStore.setIsAddRouters(true);

	await router.push('/dashboard/analysis');
};
</script>

<template>
	<div class="position-fixed top-0 start-0 text-white p-4 z-1">
		<img src="../../../../assets/logo.svg" alt="logo" style="width: 32px;"/>
		<span class="ms-2">后台管理系统</span>
	</div>
	<div class="min-vw-100 min-vh-100 background d-flex align-items-center justify-content-center">
		<div class="w-100 bg-dark bg-opacity-75 rounded-3 p-4 d-flex flex-column justify-content-center"
			 style="max-width: 420px;">
			<div class="text-white h4 text-center fw-bold">登录</div>
			<form @submit.prevent="onSubmit" class="w-100 text-white-50">
				<div class="mb-3 w-100">
					<label for="formControlUsername" class="form-label">账号</label>
					<input v-model="form.username"
						   type="text" class="form-control" id="formControlUsername" placeholder="请输入账号"/>
				</div>
				<div class="mb-3">
					<label for="formControlPassword" class="form-label">密码</label>
					<input v-model="form.password"
						   type="password" class="form-control" id="formControlPassword" placeholder="请输入密码"/>
				</div>
				<div class="pt-4">
					<button type="submit" class="btn btn-primary w-100">登录</button>
				</div>
			</form>
		</div>
	</div>
</template>

<style lang="css" scoped>
.background {
	background: url(@/assets/images/7e958f0fd41bfdf22bf05f7841b45ce1.png) center center no-repeat;
	background-size: cover;
}
</style>