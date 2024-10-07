<script setup lang="ts">
import MenuComponent from "@/app/admin/components/Menu.vue";
import logoImage from "@/assets/logo.svg";

</script>
<template>
	<div class="min-vw-100 min-vh-100 overflow-hidden">
		<nav :style="{
			 width: '220px',
			 height: '100vh',
		}">
			<div class="d-flex align-items-center py-2">
				<img :src="logoImage"
					 alt="logo" style="width: 32px;"/>
				<span class="ms-2">后台管理系统</span>
			</div>
			<MenuComponent class-name="h-100 overflow-y-auto"/>
		</nav>
	</div>
</template>