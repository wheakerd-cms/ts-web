import {
	autocompleteEmits,
	cascaderEmits,
	checkboxGroupEmits,
	colorPickerEmits,
	datePickerEmits,
	dividerEmits,
	inputEmits,
	inputNumberEmits,
	radioButtonEmits,
	radioGroupEmits,
	rateEmits,
	selectEmits,
	selectV2Emits,
	sliderEmits,
	switchEmits,
	timeSelectEmits,
	transferEmits,
	treeSelectEmits,
	uploadEmits,
} from 'element-plus';
import type {ElComponentsNames} from "@/types/element-plus/form/index";

// 定义组件事件源类型
// export type ElComponentsEventsSources = {
// 	ElAutocomplete: typeof autocompleteEmits;
// 	ElCascader: typeof cascaderEmits;
// 	ElCheckboxGroup: typeof checkboxGroupEmits;
// 	ElColorPicker: typeof colorPickerEmits;
// 	// ElDatePicker: typeof datePickerEmits;
// 	// ElDivider: typeof dividerEmits;
// 	ElInput: typeof inputEmits;
// 	ElInputNumber: typeof inputNumberEmits;
// 	// ElRadioButton: typeof radioButtonEmits;
// 	ElRadioGroup: typeof radioGroupEmits;
// 	ElRate: typeof rateEmits;
// 	// ElSelect: typeof selectEmits;
// 	// ElSelectV2: typeof selectV2Emits;
// 	ElSlider: typeof sliderEmits;
// 	ElSwitch: typeof switchEmits;
// 	// ElTimeSelect: typeof timeSelectEmits;
// 	ElTransfer: typeof transferEmits;
// 	// ElTreeSelect: typeof treeSelectEmits;
// 	// ElUpload: typeof uploadEmits;
// };

// 提取和过滤事件类型
// type ExtractedEvents<T> = {
// 	[K in keyof T]: T[K] extends (evt: infer E) => boolean ? (evt: E) => void : never;
// };

// FinalEvents 类型用于提取符合条件的事件处理函数
// type FinalEvents<T extends keyof ElComponentsEventsSources> = {
// 	[K in keyof ExtractedEvents<ElComponentsEventsSources> as ExtractedEvents<ElComponentsEventsSources>[K] extends (evt: KeyboardEvent | Event) => void ? K : never]: ExtractedEvents<ElComponentsEventsSources>[K];
// };

// 定义组件事件接口
// export interface ElComponentsEvents {
// 	ElAutocomplete: FinalEvents<'ElAutocomplete'>;
// 	ElCascader: FinalEvents<'ElCascader'>;
// 	ElCheckboxGroup: FinalEvents<'ElCheckboxGroup'>;
// 	ElColorPicker: FinalEvents<'ElColorPicker'>;
// 	// ElDatePicker: FinalEvents<'ElDatePicker'>;
// 	// ElDivider: FinalEvents<'ElDivider'>;
// 	ElInput: FinalEvents<'ElInput'>;
// 	ElInputNumber: FinalEvents<'ElInputNumber'>;
// 	// ElRadioButton: FinalEvents<'ElRadioButton'>;
// 	ElRadioGroup: FinalEvents<'ElRadioGroup'>;
// 	ElRate: FinalEvents<'ElRate'>;
// 	// ElSelect: FinalEvents<'ElSelect'>;
// 	// ElSelectV2: FinalEvents<'ElSelectV2'>;
// 	ElSlider: FinalEvents<'ElSlider'>;
// 	ElSwitch: FinalEvents<'ElSwitch'>;
// 	// ElTimeSelect: FinalEvents<'ElTimeSelect'>;
// 	ElTransfer: FinalEvents<'ElTransfer'>;
// 	// ElTreeSelect: FinalEvents<'ElTreeSelect'>;
// 	// ElUpload: FinalEvents<'ElUpload'>;
// }

export type ElComponentsEventsSources = {
	ElAutocomplete: typeof autocompleteEmits;
	ElCascader: typeof cascaderEmits;
	ElCheckboxGroup: typeof checkboxGroupEmits;
	ElColorPicker: typeof colorPickerEmits;
	// ElDatePicker: typeof datePickerEmits;
	// ElDivider: typeof dividerEmits;
	ElInput: typeof inputEmits;
	ElInputNumber: typeof inputNumberEmits;
	// ElRadioButton: typeof radioButtonEmits;
	ElRadioGroup: typeof radioGroupEmits;
	ElRate: typeof rateEmits;
	// ElSelect: typeof selectEmits;
	// ElSelectV2: typeof selectV2Emits;
	ElSlider: typeof sliderEmits;
	ElSwitch: typeof switchEmits;
	// ElTimeSelect: typeof timeSelectEmits;
	ElTransfer: typeof transferEmits;
	// ElTreeSelect: typeof treeSelectEmits;
	// ElUpload: typeof uploadEmits;
};

type ElComponentsEventsKeys<T extends keyof ElComponentsEventsSources> = keyof ElComponentsEventsSources [T];
type ElComponentsEventsArgs<T extends keyof ElComponentsEventsSources> = ElComponentsEventsSources [T] extends (...args: infer P) => infer Q ? P : never;

type GetComponentsEvents<T extends keyof ElComponentsEventsSources> = {
	[K in ElComponentsEventsKeys<T>]?: (...args: ElComponentsEventsArgs<T>) => void;
};

// type ElComponentsEventsKeys<T> = keyof ElComponentsEventsSources [T];
//
// type GetComponentsEvents<T extends keyof ElComponentsEventsSources> = {
// 	[K in ElComponentsEventsKeys<T>]: (_: any) => void;
// };


export interface ElComponentsEvents {
	ElAutocomplete: GetComponentsEvents<'ElAutocomplete'>;
	ElCascader: GetComponentsEvents<'ElCascader'>;
	ElCheckboxGroup: GetComponentsEvents<'ElCheckboxGroup'>;
	ElColorPicker: GetComponentsEvents<'ElColorPicker'>;
	// ElDatePicker: GetComponentsEvents<'ElDatePicker'>;
	// ElDivider: GetComponentsEvents<'ElDivider'>;
	ElInput: GetComponentsEvents<'ElInput'>;
	ElInputNumber: GetComponentsEvents<'ElInputNumber'>;
	// ElRadioButton: GetComponentsEvents<'ElRadioButton'>;
	ElRadioGroup: GetComponentsEvents<'ElRadioGroup'>;
	ElRate: GetComponentsEvents<'ElRate'>;
	// ElSelect: GetComponentsEvents<'ElSelect'>;
	// ElSelectV2: GetComponentsEvents<'ElSelectV2'>;
	ElSlider: GetComponentsEvents<'ElSlider'>;
	ElSwitch: GetComponentsEvents<'ElSwitch'>;
	// ElTimeSelect: GetComponentsEvents<'ElTimeSelect'>;
	ElTransfer: GetComponentsEvents<'ElTransfer'>;
	// ElTreeSelect: GetComponentsEvents<'ElTreeSelect'>;
	// ElUpload: GetComponentsEvents<'ElUpload'>;
}