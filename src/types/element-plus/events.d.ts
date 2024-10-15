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

type ElComponentEvents<T extends ElComponentsNames> =
	T extends ElComponentsNames
		? ElComponentsType [T] extends SFCWithInstall<infer C>
			? C extends infer C & {
				new(): {
					$slots: infer S;
				};
			}
				? C extends ComponentPublicInstanceConstructor<infer AA>
					? AA ['$options'] ['emits'] extends infer OE
						? OE extends (infer E | string[]) & ThisType<void>
							? E extends string []
								? never
								: E extends Object
									? E
									: never
							: never
						: never
					: never
				: never
			: never
		: never
	;

type ElComponentsEvents =  ElComponentEvents<ElComponentsNames>;

export {
	ElComponentEvents,
	ElComponentsEvents,
};