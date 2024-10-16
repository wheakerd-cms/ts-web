// noinspection JSUnusedGlobalSymbols

import * as ElementPlus from 'element-plus';
import type {ElComponentAttributes, ElComponentsAttributes} from './types/attributes';
import type {ElComponentEvents, ElComponentsEvents} from './types/events';
import type {ElComponentSlots, ElComponentsSlots} from './types/slots';

type ElComponentsType = typeof ElementPlus;

type ElComponentsNames = keyof typeof ElementPlus;

export {
	ElementPlus,
	type ElComponentsNames,
	type ElComponentsType,
	type ElComponentAttributes,
	type ElComponentsAttributes,
	type ElComponentEvents,
	type ElComponentsEvents,
	type ElComponentSlots,
	type ElComponentsSlots,
};