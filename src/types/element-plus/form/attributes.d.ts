import {
	AutocompleteProps,
	CascaderProps,
	CheckboxGroupProps,
	ColorPickerProps,
	DatePickerProps,
	DividerProps,
	InputProps,
	InputNumberProps,
	RadioButtonProps,
	RadioGroupProps,
	RateProps,
	SelectProps,
	SelectV2Props,
	SliderProps,
	SwitchProps,
	TimeSelectProps,
	TransferProps,
	UploadProps,
} from 'element-plus';
import type {ExtractPropTypes} from "@vue/runtime-core";

export type ElComponentsAttributes = {
	ElAutocomplete: Partial<AutocompleteProps>;
	ElCascader: Partial<CascaderProps>;
	ElCheckboxGroup: Partial<CheckboxGroupProps>;
	ElColorPicker: Partial<ColorPickerProps>;
	ElDatePicker: Partial<DatePickerProps>;
	ElDivider: Partial<DividerProps>;
	ElInput: Partial<InputProps>;
	ElInputNumber: Partial<InputNumberProps>;
	ElRadioButton: Partial<RadioButtonProps>;
	ElRadioGroup: Partial<RadioGroupProps>;
	ElRate: Partial<RateProps>;
	ElSelect: Partial<SelectProps>;
	ElSelectV2: Partial<SelectV2Props>;
	ElSlider: Partial<SliderProps>;
	ElSwitch: Partial<SwitchProps>;
	ElTimeSelect: Partial<TimeSelectProps>;
	ElTransfer: Partial<TransferProps>;
	ElTreeSelect: Partial<SelectProps>;
	ElUpload: Partial<UploadProps>;
}