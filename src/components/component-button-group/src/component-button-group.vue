<script lang="ts" setup>
import {
	Delete,
	Edit,
	Search,
	Share,
	Upload,
	Plus,
} from '@element-plus/icons-vue';

defineOptions({
	name: 'ComponentButtonGroup',
});

const props = defineProps<{}>();

const emits = defineEmits<{
	AddClick: [],
}>();

const AddClick = () => {
	emits('AddClick');
};
</script>
<template>
	<div class="mb-3">
		<el-button type="primary" :icon="Plus" @click="AddClick"/>
		<el-button type="primary" :icon="Edit"/>
		<el-button type="primary" :icon="Share"/>
		<el-button type="primary" :icon="Delete"/>
		<el-button type="primary" :icon="Search">Search</el-button>
		<el-button type="primary">
			Upload
			<el-icon class="el-icon--right">
				<Upload/>
			</el-icon>
		</el-button>
	</div>
</template>