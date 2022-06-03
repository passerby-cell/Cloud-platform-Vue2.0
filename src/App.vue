<template>
  <el-container>
    <el-header v-show="$route.meta.show">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px" v-show="$route.meta.show">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer v-show="$route.meta.show">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Header from './components/Header/index.vue'
import SideBar from './components/SideBar/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'App',
  components: { Header, SideBar, Footer },
  mounted() {},
}
</script>

<style scoped>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  padding: 0px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}
</style>
