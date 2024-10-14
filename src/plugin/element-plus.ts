// noinspection JSUnusedGlobalSymbols

import * as ElementPlus from 'element-plus';

type ElComponentsType = typeof ElementPlus;

type ElComponentsNames = keyof typeof ElementPlus;

export {
	ElementPlus,
	type ElComponentsNames,
	type ElComponentsType,
};