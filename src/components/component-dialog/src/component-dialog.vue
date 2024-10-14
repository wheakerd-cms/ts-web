<script lang="ts" setup>
import {ref} from "vue";
import {ElMessageBox} from "element-plus";

const props = defineProps<{
	modelValue: boolean;
}>();

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
	ElMessageBox.confirm('您确定要关闭该窗口吗？', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
	})
		.then(() => {
			done()
		})
		.catch(() => {
			// catch error
		});
};

const emits = defineEmits<{
	close: [],
}>();

const CloseDialogVisible = () => {
	emits('close');
};
</script>
<template>
	<el-dialog
		v-model="props.modelValue"
		title="提示"
		width="500"
		:before-close="handleClose"
		:destroy-on-close="true"
	>
		<span>This is a message</span>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="CloseDialogVisible">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确定</el-button>
			</div>
		</template>
	</el-dialog>
</template>