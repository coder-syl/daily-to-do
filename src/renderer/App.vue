<template>
  <div id="app">
    <!-- <el-container>
      <el-aside width="170px" v-if="show">
        <el-row class="tac">
          <el-col>
            <el-menu
              default-active="1"
              class="el-menu-vertical"
              text-color="#000"
              active-text-color="#409EFF"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-date"></i>
                  <span>我的清单</span>
                </template>
                <el-menu-item-group>
                  <router-link to="/">
                    <el-menu-item index="1-1">
                      <i class="el-icon-document"></i>
                      所有
                    </el-menu-item>
                  </router-link>
                  <router-link to="/todayToDo">
                    <el-menu-item index="1-2">
                      <i class="el-icon-document"></i>
                      今天
                    </el-menu-item>
                  </router-link>
                  <router-link to="/seventDayToDo">
                    <el-menu-item index="1-3">
                      <i class="el-icon-document"></i>
                      最近7天
                    </el-menu-item>
                  </router-link>
                </el-menu-item-group>
              </el-submenu>
              <router-link to="/allDone">
                <el-menu-item index="6">
                  <i class="el-icon-check"></i>
                  <span slot="title">已完成</span>
                </el-menu-item>
              </router-link>
              <router-link to="/allDelete">
                <el-menu-item index="7">
                  <i class="el-icon-delete"></i>
                  <span slot="title">垃圾桶</span>
                </el-menu-item>
              </router-link>
              <router-link to="/addToDo">
                <el-menu-item index="8">
                  <i class="el-icon-circle-plus-outline"></i>
                  <span slot="title">添加清单</span>
                </el-menu-item>
              </router-link>
              <router-link to="/setting">
                <el-menu-item index="9">
                  <i class="el-icon-circle-plus-outline"></i>
                  <span slot="title">系统设置</span>
                </el-menu-item>
              </router-link>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>-->
    <router-view></router-view>
  </div>
</template>

<script>
import store from "../dataStore/index";
export default {
  name: "demo",
  data() {
    return {
      // show: ture
    };
  },
  mounted() {
    // if (store.state.login.loginState === false) {
    //   this.show = false;
    // }
  }
};
</script>

<style scope>
* {
  /* box-sizing: border-box; */
  margin: 0;
  padding: 0;
}
html {
  /* 禁用html的滚动条，因为用的无框架窗口，默认就会有一个滚动条，所以去掉 */
  overflow-y: hidden;
}
body {
  font-family: "Source Sans Pro", sans-serif;
  border-top: 1px solid rgb(248, 246, 246);
}
a {
  text-decoration: none;
  color: #000;
}
a:active {
  color: 409eff;
}
.el-container {
  height: 563px;
  font-weight: 500;
}
.el-aside {
  border-right: 1px solid #e6e6e6;
  /* background-color: rgba(44, 66, 118, 0.06); */
}
.tac {
  overflow: hidden;
  height: 563px;
  background-color: rgba(44, 66, 118, 0.06);
}
.el-menu {
  border-right: none;
  /* height: 563px; */
  /* height: 563px; */
  /* min-height: 563px; */

  background-color: rgba(44, 66, 118, 0.06);
}
</style>
