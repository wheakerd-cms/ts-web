<script lang="ts" setup>

defineOptions({
	name: 'Pagination',
});

const props = withDefaults(defineProps<{
	size?: 'large' | 'default' | 'small';
	disabled?: boolean;
	background?: boolean;
	total: number;
}>(), {
	size: 'default',
	disabled: false,
	background: true,
});

const currentPage = defineModel('currentPage', {
	type: Number,
	default: 1,
});
const pageSize = defineModel('pageSize', {
	type: Number,
	default: 10,
});
const total = defineModel('total', {
	type: Number,
	default: 0,
});

const emits = defineEmits<{
	sizeChange: [value: number];
	currentChange: [value: number];
}>();

const sizeChange = (value: number) => {
	emits('sizeChange', value);
};
const currentChange = (value: number) => {
	emits('currentChange', value);
};
</script>
<template>
	<div class="mt-3 d-flex justify-content-end">
		<el-pagination :current-page="currentPage"
					   :page-size="pageSize"
					   :page-sizes="[10, 30, 50, 100]"
					   :size="props.size"
					   :disabled="props.disabled"
					   :background="props.background"
					   layout="total, sizes, prev, pager, next, jumper"
					   :total="total"
					   @size-change="sizeChange"
					   @current-change="currentChange"
		/>
	</div>
</template>