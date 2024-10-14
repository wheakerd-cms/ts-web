<script lang="tsx">
import DynamicComponent from '@/utils/DynamicComponent.vue';
import {defineComponent} from "@vue/runtime-core";
import type {InputProps} from "element-plus";
import type {GetComponentsEvents} from "@/types/element-plus/form/events";

export default defineComponent((props: {
	attributes: Partial<InputProps>;
	events: GetComponentsEvents<'ElInput'>;
}) => {
	const properties = {
		...props,
		component: 'ElInput'
	};

	return () => {
		return <DynamicComponent {...properties}/>;
	};
}, {
	name: 'util-el-input',
	props: [
		'attributes',
	],
});
</script>