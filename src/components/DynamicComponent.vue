<script lang="tsx">
import {h, type VNode} from "vue";
import {
	type ElComponentsNames,
	ElementPlus,
} from "@/plugin/element-plus";
import type {
	ElComponentsAttributes,
	ElComponentsSlots,
} from '@/plugin/element-plus';
import {defineComponent} from "@vue/runtime-core";
import type {ElComponentsEvents} from "@/plugin/element-plus/types/events";

export default defineComponent(
	(
		props: {
			component: ElComponentsNames;
			attributes?: ElComponentsAttributes;
			events?: ElComponentsEvents;
			slots?: ElComponentsSlots;
		},
	) => {
		const component = ElementPlus [props.component] as Object;

		const eventListeners = Object.entries(props.events || {}).reduce(
			(acc, [eventName, eventHandler]) => {
				if (typeof eventHandler === 'function') {
					const eventKey = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
					acc [eventKey] = eventHandler;
				} else {
					console.warn(`Invalid event handler for event: ${eventName}`);
				}
				return acc;
			},
			{} as Record<string, () => any>
		);

		const slotListeners = Object.entries(props.slots || {}).reduce(
			(acc, [slotName, slotContent]) => {
				if (typeof slotContent === 'function') {
					acc [slotName] = () => h(slotContent as (props: any) => VNode);
				} else {
					console.warn(`Invalid slot handler for slot: ${slotName}`);
				}
				return acc;
			},
			{} as Record<string, () => any>
		);

		return () => h(component, {
			...props.attributes,
			...eventListeners,
		}, slotListeners);
	},
	{
		name: 'DynamicComponent',
		props: [
			'component',
			'attributes',
			'events',
			'slots',
		],
	},
);
</script>