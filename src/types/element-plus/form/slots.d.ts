import type {SFCWithInstall} from "element-plus/es/utils";

interface GlobalComponents {
	ElAutocomplete: typeof import('element-plus/es')['ElAutocomplete'];
	ElCascader: typeof import('element-plus/es')['ElCascader'];
	ElCheckboxButton: typeof import('element-plus/es')['ElCheckboxButton'];
	ElCheckboxGroup: typeof import('element-plus/es')['ElCheckboxGroup'];
	ElColorPicker: typeof import('element-plus/es')['ElColorPicker'];
	ElDatePicker: typeof import('element-plus/es')['ElDatePicker'];
	ElDivider: typeof import('element-plus/es')['ElDivider'];
	ElInput: typeof import('element-plus/es')['ElInput'];
	ElInputNumber: typeof import('element-plus/es')['ElInputNumber'];
	ElRadioButton: typeof import('element-plus/es')['ElRadioButton'];
	ElRadioGroup: typeof import('element-plus/es')['ElRadioGroup'];
	ElRate: typeof import('element-plus/es')['ElRate'];
	ElSelect: typeof import('element-plus/es')['ElSelect'];
	ElSelectV2: typeof import('element-plus/es')['ElSelectV2'];
	ElSlider: typeof import('element-plus/es')['ElSlider'];
	ElSwitch: typeof import('element-plus/es')['ElSwitch'];
	ElTimeSelect: typeof import('element-plus/es')['ElTimeSelect'];
	ElTransfer: typeof import('element-plus/es')['ElTransfer'];
	ElTreeSelect: typeof import('element-plus/es')['ElTreeSelect'];
	ElUpload: typeof import('element-plus/es')['ElUpload'];
}

type ComponentsSlots<T extends GlobalComponents> =
	GlobalComponents [T] extends SFCWithInstall<infer C>
		? C extends C & {
			new(): {
				$slots: infer S;
			};
		}
			? {
				[K in keyof S as string extends K
					? never
					: number extends K
						? never
						: symbol extends K
							? never
							: K]?: (_: any) => JSX.Element;
			}
			: never
		: never;

// type ComponentsSlots<T> = {
// 	[k in ComponentsSlotsFrom<T>]: (_: data) => JSX.Element
// };

export interface ElComponentsSlots {
	ElAutocomplete: ComponentsSlots<'ElAutocomplete'>;
	ElCascader: ComponentsSlots<'ElCascader'>;
	ElCheckboxButton: ComponentsSlots<'ElCheckboxButton'>;
	ElCheckboxGroup: ComponentsSlots<'ElCheckboxGroup'>;
	ElColorPicker: ComponentsSlots<'ElColorPicker'>;
	ElDatePicker: ComponentsSlots<'ElDatePicker'>;
	ElDivider: ComponentsSlots<'ElDivider'>;
	ElInput: ComponentsSlots<'ElInput'>;
	ElInputNumber: ComponentsSlots<'ElInputNumber'>;
	ElRadioButton: ComponentsSlots<'ElRadioButton'>;
	ElRadioGroup: ComponentsSlots<'ElRadioGroup'>;
	ElRate: ComponentsSlots<'ElRate'>;
	ElSelect: ComponentsSlots<'ElSelect'>;
	ElSelectV2: ComponentsSlots<'ElSelectV2'>;
	ElSlider: ComponentsSlots<'ElSlider'>;
	ElSwitch: ComponentsSlots<'ElSwitch'>;
	ElTimeSelect: ComponentsSlots<'ElTimeSelect'>;
	ElTransfer: ComponentsSlots<'ElTransfer'>;
	ElTreeSelect: ComponentsSlots<'ElTreeSelect'>;
	ElUpload: ComponentsSlots<'ElUpload'>;
}