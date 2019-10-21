<template>
      <el-aside>
            <el-scrollbar>
                  <el-menu>
                        <hamburger/>
                        <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"/>
                  </el-menu>
            </el-scrollbar>
      </el-aside>
</template>

<script>
import Hamburger from '@/components/Hamburger/'
import SidebarItem from './SidebarItem'
import {mapGetters} from 'vuex'
export default {
      name: 'Sidebar',
      components:{
            Hamburger,
            SidebarItem
      },
      computed: {
            ...mapGetters([
                  'permission_routes',
            ])
      },
}
</script>