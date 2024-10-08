<script setup lang="tsx">
import {
	ElMenu,
	ElSubMenu,
	ElMenuItem,
} from "element-plus";
import type {RouteRecordRaw} from "vue-router";

defineOptions({
	name: "ComponentMenu",
});

const props = defineProps<{
	className: String,
	style: Object,
	datasource: RouteRecordRaw[],
}>();

const renderMenuItem = (datasource: RouteRecordRaw [], index: string = '0') => (
	<>
		{
			datasource.map((item: RouteRecordRaw, itemIndex: number): any => {
				const subIndex = index.toString() + itemIndex.toString();
				if (!!item.children) {
					return templateRender(item.children as unknown as RouteRecordRaw [], subIndex);
				} else {
					return (
						<>
							<ElMenuItem key={subIndex} index={subIndex}>{item.name}</ElMenuItem>
						</>
					);
				}
			})
		}
	</>
);

const templateRender = (datasource: RouteRecordRaw [], index: string = '0') => (
	<>
		{
			datasource.map((item: RouteRecordRaw, itemIndex: number): any => {
				const childrenIndex = index.toString() + itemIndex.toString();
				if (!!item.children) {
					return (
						<>
							<ElSubMenu key={childrenIndex} index={childrenIndex} v-slots={{
								'title': () => (
									<>
										<span>{item.name}</span>
									</>
								)
							}}>
								{
									renderMenuItem(item.children as unknown as RouteRecordRaw [], childrenIndex)
								}
							</ElSubMenu>
						</>
					);
				} else {
					return renderMenuItem(item.children as unknown as RouteRecordRaw [], childrenIndex);
				}
			})
		}
	</>
);

const handleOpen = () => {
};

const handleClose = () => {
};
</script>
<template>
	<ElMenu class="el-menu-vertical-demo"
			:class="props.className"
			:style="style"
			default-active="2"
			@onOpen="handleOpen"
			@onClose="handleClose"
	>
		<Component :is="templateRender(props.datasource)"/>
	</ElMenu>
</template>