<template>
    <div>
    <ul>
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </ul>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'

export default {
    name: 'Sidebar',
    components: {
        SidebarItem
    },
    data() {
        return {
            routes: this.$router.options.routes
        }
    },
}
</script>

