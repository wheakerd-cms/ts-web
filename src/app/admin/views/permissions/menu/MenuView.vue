<script lang="ts" setup>
import ComponentTable from "@/components/component-table/src/component-table.vue";
import ComponentButtonGroup from "@/components/component-button-group/src/component-button-group.vue";
import ComponentDialog from "@/components/component-dialog/src/component-dialog.vue";
import {ref} from "vue";

const dialogVisible = ref(false);


</script>
<template>
	<ComponentButtonGroup @add-click="dialogVisible = !dialogVisible"
	/>
	<ComponentTable/>
	<ComponentDialog v-model="dialogVisible"
					 @close="dialogVisible = !dialogVisible"
	/>
</template>