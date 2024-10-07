<script setup lang="ts">
import {type Ref, ref} from "vue";
import MenuComponent from "@/app/admin/components/Menu.vue";
import logoImage from "@/assets/logo.svg";

const datasource: Ref = ref([]);

</script>
<template>
	<div class="min-vw-100 min-vh-100 overflow-hidden">
		<nav :style="{
			 width: '220px',
			 height: '100vh',
			 backgroundColor: '#001529',
		}">
			<div class="d-flex align-items-center justify-content-center py-2">
				<div>
					<img :src="logoImage"
						 alt="logo" style="width: 32px;"/>
					<span class="ms-2">后台管理系统</span>
				</div>
			</div>
			<MenuComponent class-name="h-100 overflow-y-auto border-0"
						   backgroundColor="#001529"
						   :dataSource="datasource"
			/>
		</nav>
	</div>
</template>