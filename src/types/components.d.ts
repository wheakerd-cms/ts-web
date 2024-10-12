import type {ElComponentsNames} from "@/types/element-plus/form";
import type {ElComponentsAttributes} from "@/types/element-plus/form/attributes";
import type {ElComponentsEvents} from "@/types/element-plus/form/events";
import type {ElComponentsSlots} from "@/types/element-plus/form/slots";

export interface ComponentFormElement<T extends ElComponentsNames> {
	label?: string;
	component?: T;
	attributes?: ElComponentsAttributes [T];
	slots?: ElComponentsSlots [T];
	events?: ElComponentsEvents [T];
}

export interface DataSchemasSources {
	field: string;
	label?: string;
	form?: ComponentFormElement<ElComponentsNames>;
}

export interface DataSchemasFrom<T extends ElComponentsNames> {
	field: string;
	label?: string;
	form?: ComponentFormElement<T>;
}