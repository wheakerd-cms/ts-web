import type {Component, CSSProperties, Ref, StyleValue} from "vue";

interface Attributes {
	/**
	 * 绑定值
	 */
	modelValue: string | number;
	/**
	 * 原生 max 属性，设置最大值
	 */
	max: number;
	/**
	 * 原生属性，设置最小值
	 */
	min: number;
	/**
	 * 原生属性，设置输入字段的合法数字间隔
	 */
	step: number;
	/**
	 * 是否只能输入 step 的倍数
	 */
	stepStrictly: boolean;
	/**
	 * 数值精度
	 */
	precision: number;
	/**
	 * 计数器尺寸
	 */
	size: 'large' | 'default' | 'small';
	/**
	 * 原生 readonly 属性，是否只读
	 * @default false
	 */
	readonly: boolean;
	/**
	 * 是否禁用
	 * @default false
	 */
	disabled: boolean;
	/**
	 * 是否使用控制按钮
	 * @defaulttrue
	 */
	controls: boolean;
	/**
	 * 控制按钮位置
	 */
	controlsPosition: '' | 'right';
	/**
	 * 等价于原生 input name 属性
	 */
	name: string;
	/**
	 * 等价于原生 input aria-label 属性
	 * @deprecated
	 */
	label: string;
	/**
	 * 等价于原生 input aria-label 属性
	 */
	ariaLabel: string;
	/**
	 * 输入框占位文本
	 */
	placeholder: string;
	/**
	 * 等价于原生 input id 属性
	 */
	id: string;
	/**
	 * 当输入框被清空时显示的值
	 */
	valueOnClear: number | null | 'min' | 'max';
	/**
	 * 是否触发表单验证
	 * @default true
	 */
	validateEvent: boolean;
}

interface Slots {
	/**
	 * 自定义输入框按钮减少图标
	 * @param _
	 */
	"decrease-icon": (_: any) => JSX.Element;
	/**
	 * 自定义输入框按钮增加图标
	 * @param _
	 */
	"increase-icon": (_: any) => JSX.Element;
	/**
	 * 输入框头部内容
	 * @param _
	 */
	prefix: (_: any) => JSX.Element;
	/**
	 * 输入框尾部内容
	 * @param _
	 */
	suffix: (_: any) => JSX.Element;
}

interface Events {
	/**
	 * 绑定值被改变时触发
	 * @param currentValue
	 * @param oldValue
	 */
	change: (currentValue: number | undefined, oldValue: number | undefined) => void;
	/**
	 * 在组件 Input 失去焦点时触发
	 * @param event
	 * @return void
	 */
	blur: (event: FocusEvent) => void;
	/**
	 * 在组件 Input 获得焦点时触发
	 * @param event
	 */
	focus: (event: FocusEvent) => void;
}

interface Exposes {
	/**
	 * 使 input 组件失去焦点
	 */
	blur: () => void;
	/**
	 * 使 input 组件获得焦点
	 */
	focus: () => void;
}

export default {
	Attributes,
	Events,
	Slots,
	Exposes,
}