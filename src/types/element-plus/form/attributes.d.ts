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
	// SelectV2Props,
	SliderProps,
	SwitchProps,
	TimeSelectProps,
	TransferProps,
	UploadProps,
} from 'element-plus';

type Mutable<T> = {
	- readonly [K in keyof T]: T[K];
};

export type ElComponentsAttributes = {
	ElAutocomplete: Mutable<Partial<AutocompleteProps>>;
	ElCascader: Mutable<Partial<CascaderProps>>;
	ElCheckboxGroup: Mutable<Partial<CheckboxGroupProps>>;
	ElColorPicker: Mutable<Partial<ColorPickerProps>>;
	ElDatePicker: Mutable<Partial<DatePickerProps>>;
	ElDivider: Mutable<Partial<DividerProps>>;
	ElInput: Mutable<Partial<InputProps>>;
	ElInputNumber: Mutable<Partial<InputNumberProps>>;
	ElRadioButton: Mutable<Partial<RadioButtonProps>>;
	ElRadioGroup: Mutable<Partial<RadioGroupProps>>;
	ElRate: Mutable<Partial<RateProps>>;
	ElSelect: Mutable<Partial<SelectProps>>;
	// Mutable<ElSelectV2: Partial<SelectV2Props>;>
	ElSlider: Mutable<Partial<SliderProps>>;
	ElSwitch: Mutable<Partial<SwitchProps>>;
	ElTimeSelect: Mutable<Partial<TimeSelectProps>>;
	ElTransfer: Mutable<Partial<TransferProps>>;
	ElTreeSelect: Mutable<Partial<SelectProps>>;
	ElUpload: Mutable<Partial<UploadProps>>;
}