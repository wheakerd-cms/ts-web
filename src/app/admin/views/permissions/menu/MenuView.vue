<script lang="tsx" setup>
import {onMounted, reactive, type Ref, ref, unref} from "vue";
import Write from "./components/Write.vue";
import {DelTableApi, GetTableApi, SaveApi} from "@/app/admin/api/permission/menu";
import AdminPagination from "@/app/admin/components/admin-pagination";
import AdminDialog from "@/app/admin/components/admin-dialog";
import AdminTable from "@/app/admin/components/admin-table";
import {useSchemes} from "@/app/admin/utils/useSchemes";
import {useTable} from "@/app/admin/utils/useTable";
import {Delete, FolderChecked, FolderDelete, Plus, Refresh} from "@element-plus/icons-vue";
import {ElMessageBox, ElCheckbox, ElInput} from "element-plus";

const {
	tableRegister,
	tableState,
	tableMethod,
} = useTable({
	fetchDataApi: async () => {
		const {currentPage, pageSize} = tableState;
		const res = await GetTableApi({
			currentPage: unref(currentPage),
			pageSize: unref(pageSize),
		});
		return {
			list: res.data?.list || [],
			total: res.data?.total || 0,
		};
	},
	delDataApi: async () => {
		return new Promise((resolve, reject) => {
			ElMessageBox.confirm(
				'确定删除吗?',
				'警告',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).then(async () => {
				const res = await DelTableApi({ids: unref(ids)});
				resolve(!!res);
			});
			reject(false);
		});
	},
});

const {tableData, ids, loading, currentPage, pageSize, total} = tableState;
const {
	loadTableData,
	refreshTableData,
	deleteTableDataApi,
	selectTableDataAll,
	deselectTableDataAll,
	collectIdsHandler,
} = tableMethod;

const formData: Ref<Record<string, any>> = ref({});

const dataSchemes = [
	{
		prop: 'type',
		label: '菜单类型',
		show: false,
		form: {
			show: true,
			col: 24,
			component: 'ElRadioGroup',
			slots: {
				default: () => <>
					<el-radio-button label={'目录'} value={0}></el-radio-button>
					<el-radio-button label={'菜单'} value={1}></el-radio-button>
				</>,
			}
		},

	},
	{
		prop: 'parentId',
		label: '父级菜单',
		show: false,
		form: {
			show: true,
			col: 12,
			component: 'ElTreeSelect',
			attributes: {
				data: (() => {
					return [
						{
							value: '1',
							label: 'Level one 1',
							children: [
								{
									value: '1-1',
									label: 'Level two 1-1',
									children: [
										{
											value: '1-1-1',
											label: 'Level three 1-1-1',
										},
									],
								},
							],
						},
						{
							value: '2',
							label: 'Level one 2',
							children: [
								{
									value: '2-1',
									label: 'Level two 2-1',
									children: [
										{
											value: '2-1-1',
											label: 'Level three 2-1-1',
										},
									],
								},
								{
									value: '2-2',
									label: 'Level two 2-2',
									children: [
										{
											value: '2-2-1',
											label: 'Level three 2-2-1',
										},
									],
								},
							],
						},
					];
				})(),
			},
		},
		detail: {},
	},
	{
		prop: 'name',
		label: '菜单名称',
		show: true,
		form: {
			col: 12,
			component: 'ElInput',
		},
		detail: {},
	},
	{
		prop: 'componentName',
		label: '组件名称',
		show: true,
		form: {
			col: 12,
			component: 'ElInput',
		},
		detail: {},
	},
	{
		prop: 'component',
		label: '组件路径',
		show: true,
		form: {
			col: 12,
			formItem: {
				slots: {
					default: () => {
						const disabled = formData.value?.type === 0;
						if (disabled) {
							formData.value.component = '#';
						}
						return <>
							<ElInput disabled={disabled}
									 modelValue={formData.value.component}
									 onUpdate:modelValue={
										 (value) => {
											 formData.value.component = value;
										 }
									 }
							/>
						</>;
					},
				},
			},
		},
		detail: {},
	},
	{
		prop: 'path',
		label: '路由地址',
		show: true,
		form: {
			col: 12,
			component: 'ElInput',
		},
		detail: {},
	},
	{
		prop: 'icon',
		label: '图标',
		show: true,
		form: {
			col: 12,
			component: 'ElInput',
		},
		detail: {},
	},
	{
		prop: 'permissions',
		label: '操作权限',
		show: true,
		form: {
			col: 24,
			component: 'ElCheckboxGroup',
			slots: {
				default: () => <>
					<ElCheckbox label={'新增'} value={'add'}/>
					<ElCheckbox label={'编辑'} value={'edit'}/>
					<ElCheckbox label={'删除'} value={'delete'}/>
				</>,
			},
		},
		detail: {},
		table: {
			slots: {
				default: (scope: any) => {
					const permissions: string [] = scope.row.permissions;
					return <>
						{
							permissions.map(item => {
								switch (item) {
									case 'add':
										return <span>新增,</span>;
									case 'edit':
										return <span>编辑,</span>;
									case 'delete':
										return <span>删除,</span>;
									default:
										return '';
								}
							})
						}
					</>;
				}
			},
		},
	},
	{
		prop: 'status',
		label: '状态',
		show: true,
		form: {
			col: 24,
			component: 'ElSwitch',
			value: true,
		},
		detail: {},
	},
	{
		prop: 'dev',
		label: '是否开发环境',
		show: true,
		form: {
			col: 24,
			component: 'ElSwitch',
			value: false,
		},
		detail: {},
	},
	{
		prop: 'fixed',
		label: '是否固定标签',
		show: true,
		form: {
			col: 24,
			component: 'ElSwitch',
			value: false,
		},
		detail: {},
	},
];

const {getTableSchemes, getFormSchemes} = useSchemes(dataSchemes);

const dialog = reactive({
	visible: false,
	event: '',
});

const formRef = ref<InstanceType<typeof Write>>();

const ButtonClickAdd = () => {
	dialog.event = 'add';
	dialog.visible = true;
};

const editEvent = (scope: Record<string, any>) => {
	formData.value = scope.row;
	dialog.event = 'edit';
	dialog.visible = true;
};

const confirmButton = async () => {
	const validate = await formRef.value?.submit();

	if (!!validate) {
		const res = await SaveApi(formData.value);
		if (!!res) {
			dialog.visible = false;
			await refreshTableData();
		}
	}
};

onMounted(() => {
	loadTableData();
});
</script>
<template>
	<div>
		<div class="mb-3">
			<el-button type="primary" :icon="Plus"
					   @click="ButtonClickAdd"
			>新增
			</el-button>
			<el-button type="danger" :icon="Delete"
					   :disabled="Object.keys(ids).length === 0"
					   @click="deleteTableDataApi">删除
			</el-button>
			<el-button type="warning" :icon="FolderChecked" @click="selectTableDataAll">全选</el-button>
			<el-button type="info" :icon="FolderDelete" @click="deselectTableDataAll">取消选中</el-button>
			<el-button type="primary" :icon="Refresh" @click="refreshTableData">刷新</el-button>
		</div>

		<admin-table v-model:data="tableData"
					 :schemes="getTableSchemes()"
					 :loading="loading"
					 @register="tableRegister"
					 @select="collectIdsHandler"
					 @edit-event="editEvent"
		/>

		<admin-pagination v-model:current-page="currentPage"
						  v-model:page-size="pageSize"
						  v-model:total="total"
		/>
		<admin-dialog v-model="dialog.visible"
					  :event="dialog.event"
					  @submit="console.log(tableData)"
		>
			<!--			<admin-form v-if="dialog.event === 'add' || dialog.event === 'edit'"-->
			<!--						:schemes="getFormSchemes()"-->
			<!--						v-model:model="formData"-->
			<!--						@register="formRegister"-->
			<!--			/>-->
			<Write v-if="dialog.event === 'add' || dialog.event === 'edit'"
				   ref="formRef"
				   :schemes="getFormSchemes()"
				   v-model="formData"
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