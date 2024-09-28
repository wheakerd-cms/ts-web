<script setup lang="tsx">
import MenuComponent from "@/app/admin/components/Menu.vue";
import logoImage from "@/assets/logo.svg";

const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
}
</script>
<template>
	<nav :style="{
		width: '220px',
		height: '100vh',
	}">
		<MenuComponent class-name="h-100">
			<template #title>
				<div class="d-flex align-items-center">
					<img :src="logoImage"
						 alt="logo" style="width: 32px;"/>
					<span class="ms-2">后台管理系统</span>
				</div>
			</template>
		</MenuComponent>
	</nav>
</template>