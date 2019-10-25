<template>
      <el-scrollbar>
            <el-menu
            mode='vertical'
            :active-text-color="publicStyleData.activeTextColor"
            :text-color="publicStyleData.sideTextColor"
            :background-color="publicStyleData.menuBg"
            :collapse="isCollapse"
            :collapse-transition="true"
            

            >
                  <el-menu-item  @click="collapsemenu" class="doublearrowitem">
                        <svg-icon :icon-class="isCollapse?'Doublearrowright':'Doublearrowleft'" class="doublearrow"/>
                  </el-menu-item>
                  <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"/>
            </el-menu>
      </el-scrollbar>
</template>

<script>
import publicStyleData from '@/styles/publicStyleData.scss'
// import Item from './Item'
// import Hamburger from '@/components/Hamburger/'
import SidebarItem from './SidebarItem'
import {mapGetters} from 'vuex'
export default {
      name: 'Sidebar',
      components:{
            // Hamburger,
            SidebarItem
      },
      data() {
            return {
                  iscollapse:false
            }
      },
      computed: {
            ...mapGetters([
                  'permission_routes',
            ]),
            publicStyleData(){
                  return publicStyleData
            },
            isCollapse(){
                  return this.iscollapse
            },

      },
      methods: {
            collapsemenu(){
                  return this.iscollapse = !this.iscollapse
            }
      },

}
</script>

<style lang="scss" scoped>
.el-menu:not(.el-menu--collapse) {
      .doublearrowitem  {
      text-align: center !important;
      .doublearrow {
            margin: 0px !important;
      }
} 
}


</style>