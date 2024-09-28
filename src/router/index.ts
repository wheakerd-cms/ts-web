import type {Router} from "vue-router";
import {useAppStoreWithout} from "@/stores/app";

const router: Router = await useAppStoreWithout().getRouter;

export default router;