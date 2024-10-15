<script lang="ts" setup>
import {
	Delete,
	Edit,
	FolderChecked,
	FolderDelete,
	Plus,
} from '@element-plus/icons-vue';
import router from "@/app/admin/router";

defineOptions({
	name: 'PermissionsButtonGroup',
});

const props = defineProps<{}>();

const emits = defineEmits<{
	click: [event: string, title: string],
}>();

console.log(router.currentRoute.value)
</script>
<template>
	<div class="mb-3">
		<el-button type="success" :icon="Plus" @click="emits('click','add', '新增')">新增</el-button>
		<el-button type="primary" :icon="Edit" @click="emits('click','edit', '编辑')">编辑</el-button>
		<el-button type="danger" :icon="Delete" @click="emits('click','delete', '删除')">删除</el-button>
		<el-button type="warning" :icon="FolderChecked" @click="emits('click','selectAll', '全选')">全选</el-button>
		<el-button type="info" :icon="FolderDelete" @click="emits('click','deselectAll', '取消选中')">取消选中
		</el-button>
	</div>
</template>