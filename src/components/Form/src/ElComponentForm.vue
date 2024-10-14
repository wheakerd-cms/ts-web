<script lang="tsx" setup>
import {onMounted, ref, reactive} from "vue";
import {
	ElForm,
	ElRow,
	ElCol,
	ElFormItem,
} from "element-plus";
import ElInput from '@/utils/element-plus/el-input';
import type {ComponentFormElement, DataSchemasSources,} from "@/types/components";
import type {ElComponentsNames} from "@/types/element-plus/form";

defineOptions({
	name: "ElComponentForm",
});

const props = defineProps<{
	dataSchemas: { [key: string]: DataSchemasSources };
	dataSources: any [];
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
					'width': '600px',
				}}
		>
			<ElRow>
				{
					Object.entries(dataSchemas).map(([key, item]: [string, DataSchemasSources]) => {

						const field: string = item.field;
						const form: ComponentFormElement<ElComponentsNames> | undefined = item.form;

						if (!!form) {
							const label: string = !!item?.label ? item.label : !!form?.label ? form.label : key;

							const formData = {
								...form,
								field: field,
							} as ComponentFormElement<'ElInput'> & { field: string };

							const component: ElComponentsNames | undefined = form?.component;
							const componentName = !!component ? component : 'ElInput';
							const span = !!form?.col ? form.col : 24;
							refs [key] = ref(null);

							switch (componentName) {
								default:
									return <ElCol span={span}>
										<ElFormItem label={label}
													prop={field}
										>
											<ElInput ref={refs [key]} {...formData}/>
										</ElFormItem>
									</ElCol>;
							}
						}

					})
				}
			</ElRow>
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