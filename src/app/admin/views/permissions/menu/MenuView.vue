<script lang="tsx" setup>
import {ref, onMounted, type Reactive, reactive} from "vue";
import type {DataSchemasFrom} from "@/types/components";
import ElComponentForm from "@/components/Form/src/ElComponentForm.vue";

const usernameRef = ref(null);


const dataSchemas: Reactive<{
	username: DataSchemasFrom<'ElInput'>;
}> = reactive({
	username: {
		field: 'username',
		label: '用户名',
		form: {
			component: 'ElInput',
			attributes: {
				placeholder: '测试',
				showWordLimit: true,
				modelValue: '112',
			},
			slots: {},
			events: {
				blur(...args) {
				},
			}
		}
	},
	password: {
		field: 'username',
		label: '密码',
		form: {
			attributes: {
				type: 'number',
				showWordLimit: true,
				modelValue: '',
			},
			slots: {
				default: (data: any): JSX.Element => {
					return (<>{{data}}</>);
				},
			},
			events: {
				focus(event: FocusEvent): void {
					action(event);
				},
			},
		}
	}
});

const action = (event: FocusEvent) => {
	console.log('event ::::---===', event);
	if (dataSchemas?.username?.form?.attributes?.modelValue) {
		(dataSchemas.username.form.attributes.modelValue as string) = '呢好';
	}
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