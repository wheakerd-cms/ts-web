import type {Component, CSSProperties, Ref, StyleValue} from "vue";

interface Attributes {
	/**
	 * 类型
	 *  等原生 input 类型
	 *  @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#input_%E7%B1%BB%E5%9E%8B
	 *  @default text
	 */
	type:
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
		| 'datetime'  /** @deprecated */
	;
	/**
	 * 绑定值
	 * @type string|number
	 */
	modelValue?: string | number;
	/**
	 * 同原生 maxlength 属性
	 */
	maxlength?: string | number;
	/**
	 * 原生属性，最小输入长度
	 */
	minlength?: string | number;
	/**
	 * 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效
	 * @defaultValue true
	 * @defaultValue false
	 */
	showWordLimit?: boolean;
	/**
	 * 输入框占位文本
	 */
	placeholder?: string;
	/**
	 * 是否显示清除按钮，只有当 type 不是 textarea 时生效
	 * @default false
	 */
	clearable?: boolean;
	/**
	 * 指定输入值的格式。(只有当 type 是"text"时才能工作)
	 */
	formatter?: (value: string | number) => string;
	/**
	 * 指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用)
	 */
	parser?: (value: string) => string;
	/**
	 * 是否显示切换密码图标
	 * @default false
	 */
	showPassword?: boolean;
	/**
	 * 是否禁用
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * 输入框尺寸，只在 type 不为 'textarea' 时有效
	 */
	size?: 'large' | 'default' | 'small';
	/**
	 * 自定义前缀图标
	 */
	prefixIcon?: string | Component;
	/**
	 * 自定义后缀图标
	 */
	suffixIcon?: string | Component;
	/**
	 * 输入框行数，仅 type 为 'textarea' 时有效
	 * @default 2
	 */
	rows?: number;
	/**
	 * textarea 高度是否自适应，仅 type 为 'textarea' 时生效。 可以接受一个对象，比如: { minRows: 2, maxRows: 6 }
	 * @default false
	 */
	autosize?: boolean | { minRows?: number, maxRows?: number };
	/**
	 * 原生 autocomplete 属性
	 * @default off
	 */
	autocomplete?: string;
	/**
	 * 等价于原生 input name 属性
	 */
	name?: string;
	/**
	 * 原生 readonly 属性，是否只读
	 * @default false
	 */
	readonly?: boolean;
	/**
	 * 原生 max 属性，设置最大值
	 */
	max?: number;
	/**
	 * 原生属性，设置最小值
	 */
	min?: number;
	/**
	 * 原生属性，设置输入字段的合法数字间隔
	 */
	step?: number;
	/**
	 * 控制是否能被用户缩放
	 */
	resize?: 'none' | 'both' | 'horizontal' | 'vertical';
	/**
	 * 原生属性，自动获取焦点
	 * @default false
	 */
	autofocus?: boolean;
	/**
	 * 原生属性	string
	 */
	form?: string;
	/**
	 * 等价于原生 input aria-label 属性
	 * @deprecated
	 */
	label?: string;
	/**
	 * 等价于原生 input aria-label 属性
	 */
	ariaLabel?: string;
	/**
	 * 输入框的 tabindex
	 */
	tabindex?: string | number;
	/**
	 * 输入时是否触发表单的校验
	 */
	validateEvent?: boolean | true;
	/**
	 * input 元素或 textarea 元素的 style
	 */
	inputStyle?: string | CSSProperties | CSSProperties[] | string[];
}

interface Slots {
	/**
	 * 输入框头部内容，只对非 type="textarea" 有效
	 * @param _
	 */
	prefix?: (_: any) => JSX.Element;
	/**
	 * 输入框尾部内容，只对非 type="textarea" 有效
	 * @param _
	 */
	suffix?: (_: any) => JSX.Element;
	/**
	 * 输入框前置内容，只对非 type="textarea" 有效
	 * @param _
	 */
	prepend?: (_: any) => JSX.Element;
	/**
	 * 输入框后置内容，只对非 type="textarea" 有效
	 * @param _
	 */
	append?: (_: any) => JSX.Element;
}

interface Events {
	/**
	 * 当选择器的输入框失去焦点时触发
	 * @param event
	 * @return void
	 */
	blur?: (event: FocusEvent) => void;
	/**
	 * 当选择器的输入框获得焦点时触发
	 * @param event
	 * @return void
	 */
	focus: (event: FocusEvent) => void;
	/**
	 * 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
	 * @param value
	 * @return void
	 */
	change: (value: string | number) => void;
	/**
	 * 在 Input 值改变时触发
	 * @param value
	 * @return void
	 */
	input: (value: string | number) => void;
	/**
	 * 在点击由 clearable 属性生成的清空按钮时触发
	 * @param event
	 * @return void
	 */
	clear: () => void;
}

interface Exposes {
	/**
	 * 使 input 失去焦点
	 */
	blur: () => void;
	/**
	 * 清除 input 值
	 */
	clear: () => void;
	/**
	 * 使 input 获取焦点
	 */
	focus: () => void;
	/**
	 * Input HTML 元素
	 */
	input: Ref<HTMLInputElement>;
	/**
	 * HTML元素 input 或 textarea
	 */
	ref: Ref<HTMLInputElement | HTMLTextAreaElement>;
	/**
	 * 改变 textarea 大小
	 */
	resizeTextarea: () => void;
	/**
	 * 选中 input 中的文字
	 */
	select: () => void;
	/**
	 * HTML textarea 元素
	 */
	textarea: Ref<HTMLTextAreaElement>;
	/**
	 * textarea 的样式
	 */
	textareaStyle: Ref<StyleValue>;
	/**
	 * 是否是输入 composing 状态
	 */
	isComposing: Ref<boolean>;
}

export {
	Attributes,
	Slots,
	Events,
	Exposes,
}