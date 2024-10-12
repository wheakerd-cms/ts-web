<script lang='tsx' setup>
import {h} from 'vue';
import {ElInput} from 'element-plus';

defineOptions({
	name: 'ElInput',
});

const props = defineProps<{
	field: string;
	attributes?: Object;
	events?: Object;
	slots?: Object;
}>();

const eventListeners = Object.entries(props.events || {}).reduce(
	(acc, [eventName, eventHandler]) => {
		if (typeof eventHandler === 'function') {
			const eventKey = `on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`;
			acc [eventKey] = eventHandler;
		} else {
			console.error(`Invalid event handler for event: ${eventName}`);
		}
		return acc;
	},
	{} as Record<string, () => any>
);

const slotListeners = Object.entries(props.slots || {}).reduce(
	(acc, [slotName, slotContent]) => {
		if (typeof slotContent === 'function') {
			acc [slotName] = () => h(slotContent);
		} else {
			console.error(`Invalid slot handler for slot: ${slotName}`);
		}
		return acc;
	},
	{} as Record<string, () => any>
);

const Reader = () => h(ElInput, {
	...props.attributes,
	...eventListeners,
}, slotListeners);
</script>
<template>
	<Reader/>
</template>