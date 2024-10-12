<script lang="tsx" setup>
import {reactive, ref, type Reactive, type Ref, onMounted} from "vue";
import type {DataSchemas,} from "@/types/components";
import ElComponentForm from "@/components/Form/src/ElComponentForm.vue";

const usernameRef = ref(null);

const dataSchemas: Ref<{ [key: string]: DataSchemas }> = ref({
	username: {
		field: 'username',
		label: '用户名',
		form: {
			attributes: {
				placeholder: '测试',
				showWordLimit: true,
				modelValue: '66612345',
			},
			slots: {
				prefix: (_: any) => {
					return <>123</>;
				},
			},
			events: {
				focus: (event: FocusEvent): void => {
					console.log(event, '当选择器的输入框获得焦点时触发');
				},
			},
		}
	},
	password: {
		field: 'username',
		label: '密码',
		form: {
			attributes: {
				type: 'number',
				showWordLimit: true,
			},
			slots: {
				default: (data: any): JSX.Element => {
					return (<>{{data}}</>);
				},
			},
			events: {
				focus (event: FocusEvent): void  {
					action(event);
				},
			},
		}
	}
});

const action = (event: FocusEvent) => {
	console.log('event ::::---===', event);
	dataSchemas.value?.username?.form?.attributes?.modelValue
	&& (dataSchemas.value.username.form.attributes.modelValue = '呢好');
};

const dataSources = [
	{
		username: "username-1",
		password: "password-1",
	},
	{
		username: "username-2",
		password: "password-2",
	},
	{
		username: "username-3",
		password: "password-3",
	},
];

setTimeout(() => {
	console.log(
		usernameRef.value
	)
}, 2e3);

const formRef = ref(null);

onMounted(() => {


	console.log('menuView', formRef.value, formRef.value?.refs);

});

</script>
<template>

	<ElComponentForm ref="formRef"
					 :data-schemas="dataSchemas"
					 :data-sources="dataSources"
	/>

</template>