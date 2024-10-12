import type {ElFormComponents} from "@/types/components/global";

type BehaviorName = 'Attributes' | 'Slots' | 'Events' | 'Exposes';

type ComponentForm<
	T extends ElFormComponents = keyof T,
	K extends BehaviorName
> = ElFormComponents [T] [K];

export interface ComponentFormElement<T extends keyof ElFormComponents> {
	label?: string;
	component?: T;
	attributes?: ComponentForm<T, 'Attributes'>;
	slots?: ComponentForm<T, 'Slots'>;
	events?: ComponentForm<T, 'Events'>;
	exposes?: ComponentForm<T, 'Exposes'>;
}

export interface DataSourceForm<T extends keyof ElFormComponents> {
	component?: keyof T;
	form?: ComponentFormElement<T>;
}

export interface DataSchemas<T extends keyof ElFormComponents = T> extends DataSourceForm<T> {
	field: string;
	label?: string;
}