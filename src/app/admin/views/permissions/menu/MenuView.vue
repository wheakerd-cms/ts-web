<script lang="tsx" setup>
import {onMounted, reactive, ref} from "vue";
import Write from "./components/Write.vue";
import {GetTableApi, SaveApi} from "@/app/admin/api/permission/menu";
import {Delete, FolderChecked, FolderDelete, Plus} from "@element-plus/icons-vue";
import Pagination from "@/app/admin/components/pagination";
import {omit} from "lodash";
import Table from "@/app/admin/views/permissions/menu/components/Table.vue";
import AdminDialog from "@/app/admin/components/admin-dialog";

const formRef = ref<InstanceType<typeof Write>>();
const formData = reactive({});

const tableModel = reactive({
	data: [],
	currentPage: 1,
	pageSize: 10,
	total: 0,
});

const dialog = reactive({
	visible: false,
	event: '',
});

const clickAdd = () => {
	dialog.event = 'add';
	dialog.visible = true;
};

const tableRef = ref<InstanceType<typeof Table>>();

const selectAll = () => tableRef.value.tableRef.toggleAllSelection();
const deselectAll = () => tableRef.value.tableRef.clearSelection();


const confirmButton = async () => {
	const formData = await formRef.value?.submit();

	if (!!formData && await SaveApi(formData)) {
		dialog.visible = false;
	}
};

const loadTable = async () => {
	const data = await GetTableApi(omit(tableModel, ['total']));
	tableModel.data = data.list;
	tableModel.total = data.total;
};

onMounted(() => {
	loadTable();
});
</script>
<template>
	<div>
		<div class="mb-3">
			<el-button type="primary" :icon="Plus" @click="clickAdd">新增</el-button>
			<el-button type="danger" :icon="Delete">删除</el-button>
			<el-button type="warning" :icon="FolderChecked" @click="selectAll">全选</el-button>
			<el-button type="info" :icon="FolderDelete" @click="deselectAll">取消选中</el-button>
		</div>
		<Table ref="tableRef" :data="tableModel.data"/>
		<Pagination v-model:current-page="tableModel.currentPage"
					v-model:page-size="tableModel.pageSize"
					v-model:total="tableModel.total"
		/>
		<admin-dialog v-model="dialog.visible"
					  :event="dialog.event"
					  @submit="console.log(formData)"
		>
			<Write ref="formRef"
				   v-if="dialog.event === 'add'"
			/>
			<template #footer>
				<el-button v-if="dialog.event !== 'detail'"
						   @click="confirmButton"
						   type="primary"
				>
					保存
				</el-button>
				<el-button @click="dialog.visible = false">关闭</el-button>
			</template>
		</admin-dialog>
	</div>
</template>