<script lang="ts" setup>
import {type ElForm, type FormRules} from "element-plus";
import {type Reactive, reactive, type Ref, ref, watch} from "vue";

defineOptions({
	name: 'Write',
});

// const model = defineModel<Record<string, any>>({});

const rules = reactive<FormRules>({
	type: [
		{required: true, trigger: 'change',},
	],
	name: [
		{required: true, trigger: 'change',},
	],
	componentName: [
		{required: true, trigger: 'change',},
	],
	path: [
		{required: true, trigger: 'change',},
	],
	component: [
		{required: true, trigger: 'change',},
	],
	icon: [
		{required: true, trigger: 'change',},
	],
	status: [
		{required: true, trigger: 'change',},
	],
	dev: [
		{required: true, trigger: 'change',},
	],
	fixed: [
		{required: true, trigger: 'change',},
	],
});

const ruleFormRef: Ref<InstanceType<typeof ElForm> | null> = ref(null);
const formData: Reactive<Record<string, any>> = reactive({});

const submit = async () => {
	if (!ruleFormRef.value) return;
	return await ruleFormRef.value.validate()
		.then(() => formData)
		.catch((err) => console.log(err));
};

watch(
	() => formData.type,
	(value: number) => formData.component = 0 === value ? '#' : '',
);

defineExpose({
	submit,
})
</script>

<template>
	<el-form ref="ruleFormRef"
			 :model="formData"
			 :rules="rules"
			 label-position='right'
			 label-width="auto"
			 class="w-100"
	>
		<el-row>
			<el-col :span="24">
				<el-form-item label="菜单类型" prop="type">
					<el-radio-group v-model="formData.type">
						<el-radio-button label="目录" :value=0></el-radio-button>
						<el-radio-button label="菜单" :value=1></el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="父级菜单" prop="parentId">
					<el-tree-select v-model="formData.parentId"
									:data="[
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
				]"
									placeholder="顶级目录无需选择"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="formData.name"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="组件名称" prop="componentName">
					<el-input v-model="formData.componentName"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="组件路径" prop="component">
					<el-input v-model="formData.component"
							  :disabled="formData.type === 0"
					/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="路由地址" prop="path">
					<el-input v-model="formData.path"/>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="图标" prop="icon">
					<el-input v-model="formData.icon"/>
				</el-form-item>
			</el-col>
			<el-col :span="24" v-if="formData.type === 1">
				<el-form-item label="操作权限" prop="permissions">
					<el-checkbox-group v-model="formData.permissions">
						<el-checkbox label="新增" value="add"/>
						<el-checkbox label="编辑" value="edit"/>
						<el-checkbox label="删除" value="delete"/>
					</el-checkbox-group>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="状态" prop="status">
					<el-switch v-model="formData.status"/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="是否开发环境" prop="dev">
					<el-switch v-model="formData.dev"/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="是否固定标签" prop="fixed">
					<el-switch v-model="formData.fixed"/>
				</el-form-item>
			</el-col>
			<el-col :span="24">
				<el-form-item label="排序" prop="sort">
					<el-input-number v-model="formData.sort"
									 :min="0"
									 :step="1"
									 step-strictly
									 controls-position="right"
					/>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>