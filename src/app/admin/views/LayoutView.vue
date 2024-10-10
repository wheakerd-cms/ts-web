<script setup lang="ts">
import {computed, type ComputedRef, inject, onMounted, type Ref, ref, toRef,} from "vue";
import ComponentMenu from "@/app/admin/components/ComponentMenu.vue";
import logoImage from "@/assets/logo.svg?url";
import {useRouterStoreWithout} from "@/app/admin/stores/routerStore";
import {useAppStore} from "@/app/admin/stores/appStore";
import router from "@/app/admin/router";
import ComponentHeader from "@/app/admin/components/ComponentHeader.vue";

const {getAddRouters} = useRouterStoreWithout();
const appStore = useAppStore();

const datasource: Ref = ref(getAddRouters as []);

const windowHeight: Ref<number> = toRef(inject('windowHeight') as Ref<number>);
const logoHeight: ComputedRef<number> = computed(() => appStore.nav.logo.height);
const scrollbarValue: Ref<number> = ref(0);
const RefMenu: Ref<HTMLDivElement | null> = ref(null);
const menuHeightRef: Ref<number> = ref(0);

const redirectRouter = (name: string) => {
	router.push({name: name});
};

const initValueMaxRef = () => {
	scrollbarValue.value = windowHeight.value - logoHeight.value;
};

// function to update width and height
const updateRefMenuSize = () => {
	if (RefMenu.value) {
		menuHeightRef.value = RefMenu.value.clientHeight;
	}
};

// listening for changes in DOM elements
onMounted(() => {
	// initial assignment
	initValueMaxRef();
	updateRefMenuSize();

	const resizeObserver = new ResizeObserver(() => {
		updateRefMenuSize();
	});

	if (RefMenu.value) {
		resizeObserver.observe(RefMenu.value);
	}

	// stop listening when the component is unmounted
	return () => {
		resizeObserver.disconnect();
	};
});
</script>
<template>
	<div class="min-vw-100 min-vh-100 overflow-hidden d-flex">
		<nav class="min-vh-100" style="width: 220px; background-color: #001529">
			<div :style="{
					height: logoHeight + 'px',
					backgroundColor: '#001529',
				 }"
				 class="d-flex align-items-center justify-content-center text-white position-sticky top-0 z-1"
			>
				<div>
					<img :src="logoImage"
						 alt="logo" style="width: 32px;"/>
					<span class="ms-2">后台管理系统</span>
				</div>
			</div>
			<ElScrollbar :max-height="scrollbarValue">
				<ComponentMenu :style="{
								   	backgroundColor: '#001529',
						   			'--el-menu-text-color': '#FFFFFF',
				 					'--el-menu-hover-text-color': '#FFFFFF',
				  					'--el-menu-bg-color': '#0F2438',
				   					'--el-menu-hover-bg-color': '#073d68',
				    				'--el-menu-active-color': '#FFD04B',
				      				// '--el-menu-item-bg-color': '#0F2438',
						   	   }"
							   :datasource="datasource"
							   @on-item-click="redirectRouter"
							   class-name="h-100 border-0 text-white"
				/>
			</ElScrollbar>
		</nav>
		<main>
			<ComponentHeader></ComponentHeader>
			<RouterView/>
			<footer></footer>
		</main>
	</div>
</template>