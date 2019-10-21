<template>
      <el-aside>
            <el-scrollbar>
                  <el-menu>
                        <hamburger/>
                        <SidebarItem/>
                  </el-menu>
            </el-scrollbar>
      </el-aside>
</template>

<script>
import Hamburger from '@/components/Hamburger/'
import SidebarItem from './SidebarItem'
export default {
      name: 'Sidebar',
      components:{
            Hamburger,
            SidebarItem
      }
}
</script>