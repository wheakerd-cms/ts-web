<script lang="ts" setup>
import {ElTable} from "element-plus";
import {Delete, FolderChecked, FolderDelete, Plus} from "@element-plus/icons-vue";
import {ref} from "vue";

defineOptions({
	name: 'Table',
});

const props = withDefaults(defineProps<{
	data: any[];
}>(), {});

const tableRef = ref<InstanceType<typeof ElTable>>();
const tableKey = ref(new Date());

const selectAll = () => tableRef.value?.toggleAllSelection();
const deselectAll = () => tableRef.value?.clearSelection();


defineExpose({
	tableRef,
});
</script>
<template>
	<div class="mb-3">
		<el-button type="primary" :icon="Plus">新增</el-button>
		<el-button type="danger" :icon="Delete">删除</el-button>
		<el-button type="warning" :icon="FolderChecked" @click="selectAll">全选</el-button>
		<el-button type="info" :icon="FolderDelete" @click="deselectAll">取消选中</el-button>
	</div>
	<el-table ref="tableRef"
			  :data="props.data"
			  border
			  style="width: 100%"
	>
		<el-table-column type="selection" width="55"/>
		<el-table-column prop="date" label="序号" width="180"/>
		<el-table-column prop="name" label="Name" width="180"/>
		<el-table-column prop="address" label="Address"/>
	</el-table>
</template>