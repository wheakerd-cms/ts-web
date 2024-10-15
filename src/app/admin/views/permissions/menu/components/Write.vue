<script lang="ts" setup>
import Form from "@/app/admin/components/Form/src/Form.vue";
import type {ElComponentsNames} from "@/plugin/element-plus";
import type {ElComponentsAttributes} from "@/types/element-plus/attributes";
import type {ElComponentsEvents} from "@/types/element-plus/events";
import type {ElComponentsSlots} from "@/types/element-plus/slots";
import type {FormRules} from "element-plus";
import {reactive} from "vue";

defineOptions({
	name: 'Write',
});

const model = defineModel({});

const props = defineProps<{
	dataSchemes: {
		[key: string]: {
			label: string;
			col?: number;
			component: ElComponentsNames;
			attributes?: ElComponentsAttributes;
			events?: ElComponentsEvents;
			slots?: ElComponentsSlots;
		};
	};
}>();

const rules = reactive<FormRules>({
	type: [
		{required: true, trigger: 'blur',},
	],
});

</script>
<template>
	<Form v-model="model"
		  :rules="rules"
		  :data-schemes="props.dataSchemes"
	/>
</template>