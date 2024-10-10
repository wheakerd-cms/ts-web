import {
	formComponents,
	type FormComponentsKeys,
	type FormComponentsSlots,
} from "@/types/components";

export interface DataSourceMap extends Map<string, DataSource> {
}

export interface DataSource<T extends FormComponentsKeys = FormComponentsKeys> {
	field: string;
	label: string;
	hidden?: boolean;
	component: T;
	slots: FormComponentsSlots<InstanceType<typeof formComponents[T]>>;
}

export interface DataSourceMap extends Map<string, DataSource> {
}