import type {SFCWithInstall} from "element-plus/es/utils";
import {ElComponentsNames, type ElComponentsType} from "@/plugin/element-plus";

type ElComponentSlots<T extends ElComponentsNames> =
	T extends ElComponentsNames
		? ElComponentsType [T] extends SFCWithInstall<infer C>
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
			: never
		: never;

type ElComponentsSlots = ComponentSlots<ElComponentsNames>;

export type {
	ElComponentSlots,
	ElComponentsSlots,
}