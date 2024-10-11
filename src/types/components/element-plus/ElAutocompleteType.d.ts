import type {Component, CSSProperties, Ref, StyleValue} from "vue";

interface Attributes {
	/**
	 * 选中项绑定值
	 */
	modelValue: string;
	/**
	 * 占位文本
	 */
	placeholder: string;
	/**
	 * 是否可清空
	 * @default false
	 */
	clearable: boolean;
	/**
	 * 自动补全组件是否被禁用
	 * @default false
	 */
	disabled: boolean;
	/**
	 * 输入建议对象中用于显示的键名
	 * @default value
	 */
	valueKey: string;
	/**
	 * 获取输入建议的防抖延时，单位为毫秒
	 * @default 300
	 */
	debounce: number;
	/**
	 * 菜单弹出位置
	 * @default bottom-start
	 */
	placement: 'top' | 'top- start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
	/**
	 * 获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 callback(data:[])  来返回它
	 */
	fetchSuggestions: Array | ((queryString: string, callback: callbackfn) => void);
	/**
	 * whether show suggestions when input focus
	 * @default true
	 */
	triggerOnFocus: boolean;
	/**
	 * 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件
	 * @default false
	 */
	selectWhenUnmatched: boolean;
	/**
	 * 等价于原生 input name 属性
	 */
	name: string;
	/**
	 * 原生 aria-label属性
	 */
	ariaLabel: string;
	/**
	 * 是否隐藏远程加载时的加载图标
	 * @default false
	 */
	hideLoading: boolean;
	/**
	 * 下拉列表的类名
	 */
	popperClass: string;
	/**
	 * 是否将下拉列表插入至 body 元素。 在下拉列表的定位出现问题时，可将该属性设置为 false
	 * @deprecated
	 * @default false
	 */
	popperAppendToBody: boolean;
	/**
	 * 是否将下拉列表元素插入 append-to 指向的元素下
	 * @default true
	 */
	teleported: boolean;
	/**
	 * 是否默认高亮远程搜索结果的第一项
	 * @default false
	 */
	highlightFirstItem: boolean;
	/**
	 * 下拉框的宽度是否与输入框相同
	 * @default false
	 */
	fitInputWidth: boolean;
}

interface Slots {
	/**
	 * 自定义输入建议的内容
	 * @param _
	 */
	default: { item: Record<string, any> };
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
	/**
	 * 输入框前置内容，在 prefix 之前
	 * @param _
	 */
	prepend: (_: any) => JSX.Element;
	/**
	 * 输入框后置内容，在 suffix 之后
	 * @param _
	 */
	append: (_: any) => JSX.Element;
	/**
	 * 修改加载区域内容
	 * @param _
	 */
	loading: (_: any) => JSX.Element;
}

interface Events {
	/**
	 * 当选择器的输入框失去焦点时触发
	 * @param event
	 * @return void
	 */
	blur: (event: FocusEvent) => void;
	/**
	 * 当选择器的输入框获得焦点时触发
	 * @param value
	 * @return void
	 */
	focus: (event: FocusEvent) => void;
	/**
	 * 在 Input 值改变时触发
	 * @param value
	 * @return void
	 */
	input: (value: string | number) => void;
	/**
	 * 在点击由 clearable 属性生成的清空按钮时触发
	 */
	clear: () => void;
	/**
	 * 点击选中建议项时触发
	 * @param item
	 */
	select: (item: typeof modelValue | any) => void;
	/**
	 * 在 Input 值改变时触发
	 * @param value
	 */
	change: (value: string | number) => void;
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

export {
	Attributes,
	Events,
	Slots,
	Exposes,
}