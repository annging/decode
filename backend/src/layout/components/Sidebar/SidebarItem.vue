<template>
    <div v-if="!item.hidden">
        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <router-link :to="resolvePath(onlyOneChild.path)">{{ onlyOneChild.meta.title }}</router-link>
        </template>
        <div v-else>
            <template slot="title">
                <span>{{ onlyOneChild.meta.title }}</span>
            </template>
            <ul>
                <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :base-path="resolvePath(child.path)" />
            </ul>
        </div>
    </div>
</template>

<script>
import path from 'path-browserify'
import { isExternal } from '../../../utils/validate'

export default {
    name: 'SidebarItem',
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODO: refactor with render function
        this.onlyOneChild = null
        return {}
    },
    methods: {
        hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
            if (item.hidden) {
            return false
            } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
            }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
            return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
            this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
            return true
        }

        return false
        },
        resolvePath(routePath) {
        if (isExternal(routePath)) {
            return routePath
        }
        if (isExternal(this.basePath)) {
            return this.basePath
        }
        console.log(this.basePath, routePath)
        return path.resolve(this.basePath, routePath)
        }
  }
}
</script>