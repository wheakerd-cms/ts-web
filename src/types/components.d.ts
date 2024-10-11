// import {
// 	ElInputTypeAttributes,
// 	ElInputTypeEvents,
// 	ElInputTypeExposes,
// 	ElInputTypeSlots,
// } from "@/types/components/element-plus/ElInputType";
// import {
// 	ElInputNumberAttributes,
// 	ElInputNumberSlots,
// 	ElInputNumberTypeExposes,
// } from "@/types/components/element-plus/ElInputNumberType";

import * as ElInputType from "@/types/components/element-plus/ElInputType";
import * as ElInputNumberType from "@/types/components/element-plus/ElInputNumberType";


interface ComponentField<T extends string> {
	field: string;
	label: string;
	show?: boolean;
	component: T;
}

const Components = {
	ElInputType,
	ElInputNumberType,
} as const;

interface ComponentElement<T extends Components = keyof T> {
	show: boolean;
	component: T;
	attributes?: Components [T] ['Attributes'];
	slots?: Components [T] ['Slots'];
	events?: Components [T] ['Events'];
	exposes?: Components [T] ['Exposes'];
}