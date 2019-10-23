<template>
    <div v-if="!item.hidden">
        <!-- 所有的侧边栏功能都是在layout组件下显示，当只有一个功能并且不是隐藏的属性，就吧他显示出来 -->

        <template v-if="hasoneshowingchildren(item.children,item)">
            <Applink v-if="onlyOneChild.meta" :pathtogo="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)"  popper-append-to-body>
                    <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>
                </el-menu-item>
            </Applink>
            
        </template>
        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
        <template slot="title">
            <item v-if="item.meta" :title="item.meta.title" :icon="item.meta.icon"/>
        </template>
        <sidebar-item
            v-for="child in item.children"
            :key="child.path"
            :is-nest="true"
            :item="child"
            :base-path="resolvePath(child.path)"
            class="nest-menu"
        />
        </el-submenu>




        <!-- 如果以后项目侧边栏需要嵌套多层折叠功能，可以根据需要调整该组件，使用递归的原理，将children下面的children组件显示出来 -->

    </div>
</template>

<script>
    import path from 'path'
    import Applink from './AppLink'
    import Item from './Item'
    export default {
        name: 'SidebarItem',
        props: {
            // route object
            item: {
            type: Object,
            required: true
            },
            isNest: {
            type: Boolean,
            default: false
            },
            basePath: {
            type: String,
            default: ''
            }
        },
        components:{
            Applink,
            Item
        },

        data (){
            this.onlyOneChild = null;
            return {} //当只有一个或者没有子路由的时候定义其值
        },

        methods:{
            hasoneshowingchildren(children=[],parent){
                const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                } else {

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
                // if (isExternal(routePath)) {
                //     return routePath
                // }
                // if (isExternal(this.basePath)) {
                //     return this.basePath
                // }
                return path.resolve(this.basePath, routePath)
            }

        }
    }
</script>