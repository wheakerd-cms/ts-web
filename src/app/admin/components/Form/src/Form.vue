<script lang="tsx" setup>
import type {
	ElComponentsNames,
	ElComponentsAttributes,
	ElComponentsEvents,
	ElComponentsSlots,
} from "@/plugin/element-plus";
import DynamicComponent from "@/components/DynamicComponent.vue";
import {ElForm, ElRow, ElCol, ElFormItem, type FormRules} from 'element-plus';
import {ref, toRaw} from "vue";

interface DataSchemeItem {
	label: string;
	col?: number;
	value?: any;
	component: ElComponentsNames;
	attributes?: ElComponentsAttributes;
	events?: ElComponentsEvents;
	slots?: ElComponentsSlots;
}

defineOptions({
	name: 'Form',
});

const props = defineProps<{
	rules: FormRules;
	dataSchemes: Record<string, DataSchemeItem>;
	modelValue: Record<string, any>;
}>();

const formElRef = ref<InstanceType<typeof ElForm> | null>(null);

const Reader = () => <>
	<ElRow>
		{
			Object.entries(props.dataSchemes).map(([key, item]) => {

				if (
					!props.modelValue.hasOwnProperty(key)
					&& !props.modelValue.hasOwnProperty(key)
					&& item.hasOwnProperty('value')
				) {
					console.log(
						item.value,
						typeof item.value,
					)
					props.modelValue [key] = toRaw(item.value);
				}

				return (<>
					<ElCol span={item.col ?? 24}>
						<ElFormItem label={item.label} prop={key}>
							<DynamicComponent
								component={item?.component ?? 'ElInput'}
								v-model={props.modelValue [key]}
								attributes={item?.attributes}
								events={item?.events}
								slots={item?.slots}
							/>
						</ElFormItem>
					</ElCol>
				</>);
			})
		}
	</ElRow>
</>;

defineExpose({
	formElRef,
});
</script>
<template>
	<ElForm ref="formElRef"
			:rules="props?.rules"
			:model="props.modelValue"
			label-position='right'
			label-width="auto"
			class="w-100"
	>
		<Reader :data-schemes="props.dataSchemes"/>
	</ElForm>
</template>