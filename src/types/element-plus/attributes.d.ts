import {
	ElComponentsNames,
	type ElComponentsType,
} from "@/plugin/element-plus";
import type {SFCWithInstall} from "element-plus/es/utils";
import type {
	ComputedOptions,
	MethodOptions,
} from "@vue/runtime-core";

type ComponentPublicInstanceConstructor<T, Props = any, RawBindings = any, D = any, C extends ComputedOptions = ComputedOptions, M extends MethodOptions = MethodOptions> = {
	__isFragment?: never;
	__isTeleport?: never;
	__isSuspense?: never;
	new(...args: any[]): T;
};

type ElComponentAttributes<T extends ElComponentsNames> =
	T extends ElComponentsNames
		? ElComponentsType [T] extends SFCWithInstall<infer C>
			? C extends infer C & {
				new(): {
					$slots: infer S;
				};
			}
				? C extends ComponentPublicInstanceConstructor<infer AA>
					? AA ['$props'] extends Partial<infer U>
						? Partial<{
							-readonly [P in keyof U]?: U[P];
						}>
						: never
					: never
				: never
			: never
		: never
	;

type ElComponentsAttributes = ElComponentAttributes<ElComponentsNames>;

export {
	ElComponentAttributes,
	ElComponentsAttributes,
};