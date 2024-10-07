<script lang="tsx">
import {defineComponent} from "vue";
import {
    ElMenu,
    ElSubMenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElIcon,
} from "element-plus";
import {
    Menu,
    Document,
    Location,
    Setting,
} from "@element-plus/icons-vue";

export default defineComponent({
    name: "MenuComponent",
    computed: {},
    props: {
        className: {},
    },
    setup(props, {slots}) {
        const handleOpen = () => {
        };

        const handleClose = () => {
        };

        return () => (
            <>
                <ElMenu active-text-color="#ffd04b"
                        background-color="#545c64"
                        class={`el-menu-vertical-demo ${props.className}`}
                        default-active="2"
                        text-color="#fff"
                        onOpen={handleOpen}
                        onClose={handleClose}
                >
                    <ElSubMenu index="1" v-slots={{
                        title: () => {
                            return (<>
                                <ElIcon>
                                    <Location/>
                                </ElIcon>
                                <span>Navigator One</span>
                            </>);
                        },
                    }}>
                        <ElMenuItemGroup title="Group One">
                            <ElMenuItem index="1-1">item one</ElMenuItem>
                            <ElMenuItem index="1-2">item two</ElMenuItem>
                        </ElMenuItemGroup>
                        <ElMenuItemGroup title="Group Two">
                            <ElMenuItem index="1-3">item three</ElMenuItem>
                        </ElMenuItemGroup>
                        <ElSubMenu index="1-4" v-slots={{
                            title: () => 'item four',
                        }}>
                            <ElMenuItem index="1-4-1">item one</ElMenuItem>
                        </ElSubMenu>
                    </ElSubMenu>
                    <ElMenuItem index="2">
                        <ElIcon>
                            <Menu/>
                        </ElIcon>
                        <span>Navigator Two</span>
                    </ElMenuItem>
                    <ElMenuItem index="3" disabled>
                        <ElIcon>
                            <Document/>
                        </ElIcon>
                        <span>Navigator Three</span>
                    </ElMenuItem>
                    <ElMenuItem index="4">
                        <ElIcon>
                            <Setting/>
                        </ElIcon>
                        <span>Navigator Four</span>
                    </ElMenuItem><ElMenuItem index="2">
                        <ElIcon>
                            <Menu/>
                        </ElIcon>
                        <span>Navigator Two</span>
                    </ElMenuItem>
                    <ElMenuItem index="3" disabled>
                        <ElIcon>
                            <Document/>
                        </ElIcon>
                        <span>Navigator Three</span>
                    </ElMenuItem>
                    <ElMenuItem index="4">
                        <ElIcon>
                            <Setting/>
                        </ElIcon>
                        <span>Navigator Four</span>
                    </ElMenuItem><ElMenuItem index="2">
                        <ElIcon>
                            <Menu/>
                        </ElIcon>
                        <span>Navigator Two</span>
                    </ElMenuItem>
                    <ElMenuItem index="3" disabled>
                        <ElIcon>
                            <Document/>
                        </ElIcon>
                        <span>Navigator Three</span>
                    </ElMenuItem>
                    <ElMenuItem index="4">
                        <ElIcon>
                            <Setting/>
                        </ElIcon>
                        <span>Navigator Four</span>
                    </ElMenuItem><ElMenuItem index="2">
                        <ElIcon>
                            <Menu/>
                        </ElIcon>
                        <span>Navigator Two</span>
                    </ElMenuItem>
                    <ElMenuItem index="3" disabled>
                        <ElIcon>
                            <Document/>
                        </ElIcon>
                        <span>Navigator Three</span>
                    </ElMenuItem>
                    <ElMenuItem index="4">
                        <ElIcon>
                            <Setting/>
                        </ElIcon>
                        <span>Navigator Four</span>
                    </ElMenuItem><ElMenuItem index="2">
                        <ElIcon>
                            <Menu/>
                        </ElIcon>
                        <span>Navigator Two</span>
                    </ElMenuItem>
                    <ElMenuItem index="3" disabled>
                        <ElIcon>
                            <Document/>
                        </ElIcon>
                        <span>Navigator Three</span>
                    </ElMenuItem>
                    <ElMenuItem index="4">
                        <ElIcon>
                            <Setting/>
                        </ElIcon>
                        <span>Navigator Four</span>
                    </ElMenuItem><ElMenuItem index="2">
                        <ElIcon>
                            <Menu/>
                        </ElIcon>
                        <span>Navigator Two</span>
                    </ElMenuItem>
                    <ElMenuItem index="3" disabled>
                        <ElIcon>
                            <Document/>
                        </ElIcon>
                        <span>Navigator Three</span>
                    </ElMenuItem>
                    <ElMenuItem index="4">
                        <ElIcon>
                            <Setting/>
                        </ElIcon>
                        <span>Navigator Four</span>
                    </ElMenuItem>
                </ElMenu>
            </>
        );
    },
});
</script>