<script lang="ts" setup>
import {ElForm, type FormRules} from "element-plus";
import {reactive, ref} from "vue";
import AdminForm from "@/app/admin/components/admin-form";

defineOptions({
	name: 'Write',
});

const model = defineModel<Record<string, any>>();
const props = defineProps<{
	schemes: Record<string, any>[];
}>();

const formRef = ref<InstanceType<typeof ElForm>>();

const rules = reactive<FormRules>({
	type: [
		{required: true, trigger: 'change',},
	],
	name: [
		{required: true, trigger: 'change',},
	],
	componentName: [
		{required: true, trigger: 'change',},
	],
	path: [
		{required: true, trigger: 'change',},
	],
	component: [
		{required: true, trigger: 'change',},
	],
	icon: [
		{required: true, trigger: 'change',},
	],
	status: [
		{required: true, trigger: 'change',},
	],
	dev: [
		{required: true, trigger: 'change',},
	],
	fixed: [
		{required: true, trigger: 'change',},
	],
});

const formRegister = (ref: typeof ElForm) => {
	formRef.value = ref;
}

const submit = async () => {
	return await formRef.value.validate().catch(
		err => console.error(err)
	);
};

defineExpose({
	submit,
});
</script>
<template>
	<admin-form :rules="rules"
				:schemes="props.schemes"
				v-model="model"
				@register="formRegister"
	/>
</template>