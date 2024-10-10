<script lang="ts" setup>
import {reactive} from "vue";

defineOptions({
	name: 'ComponentAddAction',
});

const operateList = {
	'add': '新增',
	'edit': '编辑',
	'delete': '删除选中',
	'invert': '反选',
	'selectAll': '选中所有',
	'deselectAll': '取消全选',
};

const props = defineProps<{
	model: boolean;
	operate: 'add' | 'edit' | 'delete' | 'invert' | 'selectAll' | 'deselectAll';
}>();

const operateName: string = operateList [props.operate];

const form = reactive({
	type: false,
	name: '',
});

const onSubmit = () => {
	console.log('submit!')
};
</script>
<template>
	<el-dialog v-model="props.model"
			   title="新增"
			   draggable
			   :show-close="false"
			   width="680px"
	>
		<template #header>
			<div class="px-2">
				<span>{{ operateName }}</span>
			</div>
			<el-divider/>
		</template>
		<template #default>
			<div class="w-100 d-flex justify-content-center px-2">
				<el-form :model="form" label-position="right" label-width="auto" class="w-100">
					<el-row>
						<el-col :span="24">
							<el-form-item label="菜单类型">
								<el-radio-group v-model="form.type">
									<el-radio-button label="目录" :value="true"/>
									<el-radio-button label="菜单" :value="false"/>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="父级菜单">
								<el-input v-model="form.name">
									<template #></template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="菜单名称">
								<el-input v-model="form.name"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="组件地址">
								<el-input v-model="form.name"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="组件名称">
								<el-input v-model="form.name"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="路径">
								<el-input v-model="form.name"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="状态">
								<el-input v-model="form.name"/>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="按钮权限">
								<el-checkbox-group>
									<el-checkbox v-for="(item, key) in operateList"
												 :label="item"
												 :value="key"
									/>
								</el-checkbox-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否生产环境">
								<el-switch :model-value="true"/>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否固定标签">
								<el-switch :model-value="true"/>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">Create</el-button>
						<el-button>Cancel</el-button>
					</el-form-item>
				</el-form>
			</div>
		</template>
	</el-dialog>
</template>