<script lang="tsx">

import {defineComponent} from "@vue/runtime-core";
import type {InputProps} from "element-plus";

export default defineComponent((props: {
	attributes: Partial<InputProps>;
}) => {
	return () => {
		return <>el-input</>;
	};
}, {
	name: 'util-el-input-number',
	props: [
		'attributes',
	],
});
</script>