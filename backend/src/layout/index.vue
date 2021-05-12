<template>
    <div class="app-container">
        <sidebar class="sidebar-container" />
        <div class="app-main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/Sidebar/index.vue'

export default {
    name: 'Layout',
    components: {
        Sidebar
    }
    
}
</script>

<style scoped>
.app-container {
    display: grid;
    grid-template-columns: 240px 1fr;
    height: 100vh;
}
.sidebar-container {
    background-color: #fafafa;
}
.app-main {
    padding: 20px;
}
</style>
