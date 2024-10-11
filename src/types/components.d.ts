import type {SFCWithInstall} from 'element-plus/es/utils';
import {GlobalComponents} from 'vue';
import type {ComponentPublicInstance, ComputedOptions, DefineComponent, MethodOptions} from "@vue/runtime-core";

type ComponentsType = { [key: string]: unknown };

interface Components extends GlobalComponents, ComponentsType {
}

export type ComponentsSlots<T extends Components = keyof T> =
	Components [T] extends SFCWithInstall<infer C>
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

type ComponentPublicInstanceConstructor<T extends ComponentPublicInstance<Props, RawBindings, D, C, M> = ComponentPublicInstance<any>, Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions> = {
	__isFragment?: never;
	__isTeleport?: never;
	__isSuspense?: never;
	new(...args: any[]): T;
};

type ComponentsAttributes<T extends Components = keyof T> =
	Components [T] extends SFCWithInstall<infer C>
		? C extends infer C & {
			new(): {
				$slots: infer S;
			};
		}
			? C extends ComponentPublicInstanceConstructor<
					infer AA,
					infer AB
				>
				? AA ['$props']
				: never
			: never
		: never;


export interface ComponentField<T extends Components = keyof T> {
	field: string;
	label: string;
	show?: boolean;
	component: T;
	attributes?: ComponentsAttributes<T>;
	slots: ComponentsSlots<T>;
}

interface ComponentElInput extends Omit<ComponentField<'ElInput'>, 'component'> {
	events: {
		blur: (event: Function) => void;
	}
}