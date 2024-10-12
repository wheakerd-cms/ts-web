<script lang="tsx" setup>
import {onMounted, ref, reactive} from "vue";
import {
	ElForm,
	ElFormItem,
} from "element-plus";
import {ElInput} from "@/components/element-plus/el-input";
import type {ComponentFormElement, DataSchemasSources,} from "@/types/components";
import type {ElComponentsNames} from "@/types/element-plus/form";

defineOptions({
	name: "ElComponentForm",
});

const props = defineProps<{
	dataSchemas: { [key: string]: DataSchemasSources };
	dataSources: [];
}>();

const {
	dataSchemas,
	dataSources,
} = props;

const formRef = ref(null);
const refs = reactive<({ [key: string]: InstanceType<any> | null })>({});

const FormReader = () => (
	<>
		<ElForm ref={formRef}
				model={dataSources}
				labelWidth={'auto'}
				style={{
					'max-width': '600px',
				}}
		>
			{
				Object.entries(dataSchemas).map(([key, item]: [string, DataSchemasSources]) => {

					const field: string = item.field;
					const form: ComponentFormElement<ElComponentsNames> | undefined = item.form;

					if (!!form) {
						const label: string = !!item?.label ? item.label : !!form?.label ? form.label : key;

						const formData = {
							...form,
							field: field,
						};

						const component: ElComponentsNames | undefined = form?.component;
						const componentName = !!component ? component : 'ElInput';
						refs [key] = ref(null);

						switch (componentName) {
							default:
								return <ElFormItem label={label}
												   prop={field}
								>
									<ElInput ref={refs [key]} {...formData}/>
								</ElFormItem>;
						}
					}

				})
			}
		</ElForm>
	</>
);

onMounted(() => {

});

defineExpose({
	formRef,
	refs,
});
</script>
<template>
	<FormReader/>
</template>