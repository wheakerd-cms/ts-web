<script lang="tsx" setup>
import {type Reactive, reactive} from "vue";
import PermissionsButtonGroup from "@/app/admin/components/PermissionsButtonGroup.vue";
import AdminDialog from "@/app/admin/components/Dialog/src/admin-dialog.vue";
import Write from "./components/Write.vue";

const dialog = reactive({
	visible: false,
	title: '',
	event: '',
});

const ButtonClick = (event: string, title: string) => {
	dialog.title = title;
	dialog.event = event;
	dialog.visible = true;
};

const dataSources: Reactive<{
	[key: string]: {
		form?: {
			component?: 'ElInput';
		};
	};
}> = reactive({
	type: {
		label: '菜单类型',
		form: {
			col: 24,
			component: 'ElRadioGroup',
			slots: {
				default: () => (<>
					<ElRadioButton label={'目录'} value={0}/>
					<ElRadioButton label={'菜单'} value={1}/>
				</>),
			},
		},
	},
	parentId: {
		label: '父级菜单',
		form: {
			col: 12,
			component: 'ElTreeSelect',
			attributes: {
				placeholder: '请选择父级菜单',
				data: [
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
				],
			},
		},
	},
	name: {
		label: '菜单名称',
		form: {
			col: 12,
			component: 'ElInput',
		},
	},
	componentName: {
		label: '组件名称',
		form: {
			col: 12,
			component: 'ElInput',
		},
	},
	src: {
		label: '组件路径',
		form: {
			col: 12,
			component: 'ElInput',
		},
	},
	component: {
		label: '图标',
		form: {
			col: 12,
			component: 'ElInput',
		},
	},
	permissions: {
		label: '按钮权限',
		form: {
			col: 24,
			component: 'ElCheckboxGroup',
			slots: {
				default: () => Object.entries({
					'add': '新增',
					'edit': '编辑',
					'delete': '删除',
					'selectAll': '全选',
					'deselectAll': '取消选中',
				}).map(([key, item]) => (<>
					<ElCheckbox key={key}
								label={item}
								value={key}/>
				</>)),
			},
		},
	},
	status: {
		label: '状态',
		form: {
			col: 24,
			component: 'ElSwitch',
		},
	},
	dev: {
		label: '是否生产环境',
		form: {
			col: 24,
			component: 'ElSwitch',
		},
	},
	fixed: {
		label: '是否固定标签',
		form: {
			col: 24,
			component: 'ElSwitch',
		},
	},
});


const getFormSchemes = (dataSources: Record<string, any>) => Object.fromEntries(
	Object.entries(dataSources).map(([key, item]) => [
		key,
		{
			label: item?.label,
			...item?.form,
		}
	])
);

const formSchemes = getFormSchemes(dataSources);

const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles',
	},
];

const formData = reactive({});

const Confirm = () => {
};

</script>
<template>
	<div>
		<PermissionsButtonGroup @click="ButtonClick"/>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column type="selection" width="55"/>
			<el-table-column prop="date" label="序号" width="180"/>
			<el-table-column prop="name" label="Name" width="180"/>
			<el-table-column prop="address" label="Address"/>
		</el-table>
		<AdminDialog v-model="dialog.visible"
					 :title="dialog.title"
					 @submit="console.log(formData)"
		>
			<Write v-if="dialog.event === 'add'"
				   v-model="formData"
				   :data-schemes="formSchemes"
			/>
			<template #footer>
				<div class="dialog-footer">
					<el-button v-if="dialog.event !== 'detail'"
							   @click="Confirm"
							   type="primary"
					>
						保存
					</el-button>
					<el-button @click="dialog.visible = false">关闭</el-button>
				</div>
			</template>
		</AdminDialog>
	</div>
</template>