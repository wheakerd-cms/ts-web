<script setup lang="ts">
import {type Ref, ref} from "vue";
import ComponentMenu from "@/app/admin/components/Menu.vue";
import logoImage from "@/assets/logo.svg";
import {useRouterStoreWithout} from "@/app/admin/stores/routerStore";

const {getAddRouters} = useRouterStoreWithout();

const datasource: Ref = ref(getAddRouters as []);

console.log(datasource.value);

</script>
<template>
	<div class="min-vw-100 min-vh-100 overflow-hidden">
		<nav :style="{
			 width: '220px',
			 height: '100vh',
			 backgroundColor: '#001529',
		}">
			<div class="d-flex align-items-center justify-content-center pt-3 pb-2 text-white">
				<div>
					<img :src="logoImage"
						 alt="logo" style="width: 32px;"/>
					<span class="ms-2">后台管理系统</span>
				</div>
			</div>
			<ComponentMenu class-name="h-100 overflow-y-auto border-0 text-white"
						   :style="{
						   		'--el-menu-text-color': '#FFFFFF',
				 				'--el-menu-hover-text-color': '#FFFFFF',
				  				'--el-menu-bg-color': '#001529',
				   				'--el-menu-hover-bg-color': '#434A50FF',
				    			'--el-menu-active-color': '#FFD04B',
				      			'--1222a27a-backgroundColor': '#001529',
						   }"
						   :datasource="datasource"
			/>
		</nav>
	</div>
</template>