<script lang="tsx">
import {defineComponent} from '@vue/runtime-core';
import type {ElComponentsNames} from "@/plugin/element-plus";
import type {ElComponentsAttributes} from "@/types/element-plus/attributes";
import type {ElComponentsEvents} from "@/types/element-plus/events";
import type {ElComponentsSlots} from "@/types/element-plus/slots";
import DynamicComponent from "@/utils/DynamicComponent.vue";

export default defineComponent(
	(
		props: {
			rules?: Object;
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
			dataSources?: {
				[key: string]: any;
			};
			modelValue: Object;
		},
	) => {
		return () => (<>
			<ElForm rules={props.rules}
					model={props.modelValue}
					label-position='right'
					label-width="auto"
					class="w-100"
			>
				<ElRow>
					{
						Object.entries(props.dataSchemes).map(([key, item]) => {
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
			</ElForm>
		</>);
	},
	{
		name: 'Form',
		props: [
			'rules',
			'dataSchemes',
			'dataSources',
			'modelValue',
		],
	},
);
</script>