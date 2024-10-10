<script lang="tsx" setup>
import ComponentAddAction from "@/app/admin/components/Feedback/ComponentAddAction.vue";
import {ref} from "vue";
import type {DataSourceMap} from "src/components/Form/src/types";

interface User {
	date: string
	name: string
	address: string
}

const tableRowClassName = (
	{
		row,
		rowIndex,
	}: {
		row: User
		rowIndex: number
	}) => {
	if (rowIndex === 1) {
		return 'warning-row'
	} else if (rowIndex === 3) {
		return 'success-row'
	}
	return ''
}

const tableData: User[] = [
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

const AddActionModel = ref(false);

const AddAction = () => {
	AddActionModel.value = !AddActionModel.value;
};

const dataSource: DataSourceMap = new Map() as DataSourceMap;

dataSource.set('default', {
	field: 'username',
	label: '用户名',
	hidden: false,
	component: "ElInput" as const,
	slots: {

	},
});
// dataSource.set('form', {
// 	field: 'username',
// 	label: '用户名',
// 	slots: {
// 		default: (data: any) => {
// 			return <>{data.name}</>;
// 		},
// 	},
// });

// const formItems = () => {
// 	const username = {
// 		type: String,
// 		required: true,
// 		form: {},
// 		table: {},
// 	};
// 	const password = string;
// 	const email = string;
//
// 	return toRefs({
// 		username,
// 		password,
// 		email,
// 	});
// };

</script>
<template>
	<div class="mb-4">
		<el-button>Plain</el-button>
		<el-button type="primary" @click="AddAction">新增</el-button>
		<el-button type="success">Success</el-button>
		<el-button type="info">Info</el-button>
		<el-button type="warning">Warning</el-button>
		<el-button type="danger">Danger</el-button>
	</div>
	<el-table :data="tableData"
			  :row-class-name="tableRowClassName"
			  border
			  style="width: 100%"
	>
		<el-table-column prop="date" label="Date" width="180"/>
		<el-table-column prop="name" label="Name" width="180"/>
		<el-table-column prop="address" label="Address"/>
	</el-table>

	<ComponentAddAction :model="AddActionModel"
						:operate="'add'"
	/>
</template>