import type {ElForm} from "element-plus";
import {nextTick, type Ref, ref, unref, watch} from "vue";

const useForm = () => {
	const formRef = ref<InstanceType<typeof ElForm>>();
	const formData: Ref<Record<string, any>> = ref({});

	const formRegister = (ref: typeof ElForm) => {
		formRef.value = ref;
	};

	const getFormRef = async () => {
		await nextTick();
		const form = unref(formRef);
		if (!form) {
			console.error('The form is not registered!');
		}
		return form;
	};

	return {
		formRegister,
		getFormRef,
		formState: {
			formData,
		},
	};
};

export {
	useForm,
};