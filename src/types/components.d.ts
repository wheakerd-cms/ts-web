import {
	ElCascader,
	ElCheckboxGroup,
	ElColorPicker,
	ElDatePicker,
	ElInput,
	ElInputNumber,
	ElRadioGroup,
	ElRate,
	ElSelect,
	ElSelectV2,
	ElSlider,
	ElSwitch,
	ElTimePicker,
	ElTimeSelect,
	ElTransfer,
	ElAutocomplete,
	ElDivider,
	ElTreeSelect,
	ElUpload,
} from "element-plus";

export const formComponents = {
	ElCascader,
	ElCheckboxGroup,
	ElColorPicker,
	ElDatePicker,
	ElInput,
	ElInputNumber,
	ElRadioGroup,
	ElRate,
	ElSelect,
	ElSelectV2,
	ElSlider,
	ElSwitch,
	ElTimePicker,
	ElTimeSelect,
	ElTransfer,
	ElAutocomplete,
	ElDivider,
	ElTreeSelect,
	ElUpload,
} as const;

export type FormComponentsKeys = keyof typeof formComponents;

type FormComponents = typeof formComponents [FormComponentsKeys];

export type FormComponentsSlots<T> = T extends { $slots: infer S }
	? keyof S extends infer K
		? K extends string
			? K
			: never
		: never
	: never;