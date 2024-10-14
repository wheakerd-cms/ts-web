<script lang="tsx">
import {defineComponent} from "@vue/runtime-core";
import DynamicComponent from '@/utils/DynamicComponent.vue';
import type {ElComponentAttributes, ElComponentsAttributes} from "@/types/element-plus/attributes";
import type {ElComponentsEvents} from "@/types/element-plus/events";
import type {ElComponentSlots, ElComponentsSlots} from "@/types/element-plus/slots";
import {type ElComponentsNames, ElementPlus} from "@/plugin/element-plus";

export default defineComponent(
	(
		props: {
			col?: number | { attributes?: ElComponentAttributes<'ElCol'> };
			item?: {
				attributes?: ElComponentAttributes<'ElFormItem'>;
				slots?: ElComponentSlots<'ElFormItem'>;
			};
			component?: ElComponentsNames;
			attributes?: ElComponentsAttributes;
			events?: ElComponentsEvents;
			slots?: ElComponentsSlots;
			dataSources: any;
		},
	) => {
		return () => (<>
			<DynamicComponent
				component={'ElCol'}
				slots={{
					default: () => {
						if (!!props?.item
							&& !!props?.item?.slots
							&& 'default' in props.item.slots
						) {
							delete props.item.slots.default;
						}
						return (<>
							<DynamicComponent
								component={'ElFormItem'}
								attributes={props?.item?.attributes}
								slots={{
									...props?.slots,
									default: () => (<>
										<DynamicComponent
											component={!!props?.component ? ElementPlus [props.component] : 'ElInput'}
											attributes={props?.attributes}
											events={props?.events}
											slots={props?.slots}
										/>
									</>),
								}}
							/>
						</>)
					},
				}}
			/>
		</>);
	},
	{
		name: 'component-form-item',
		props: [
			'col',
			'attributes',
			'slots',
			'form',
			'dataSources',
		],
	}
);
</script>