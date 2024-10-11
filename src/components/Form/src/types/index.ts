import {
	type ComponentsSlots,
} from "@/types/components";

export interface ComponentField<T> {
	field: string;
	label: string;
	show?: boolean;
	slots?: ComponentsSlots<T>,
}

interface ElComponentRadioGroup extends ComponentField<"ElRadioGroup"> {

}