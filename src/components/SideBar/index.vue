<template>
  <el-row>
    <el-col :span="24">
      <el-menu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span>我的作业</span>
          </template>
          <el-menu-item @click="toJob">
            <span slot="title">标准作业</span>
          </el-menu-item>
          <el-menu-item @click="toJob">
            <span slot="title">MPI作业</span>
          </el-menu-item>
          <el-menu-item @click="toJob">
            <span slot="title">Tensorflow作业</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-reading"></i>
            <span>数据服务</span>
          </template>
          <el-menu-item @click="toData">
            <span slot="title">数据集</span>
          </el-menu-item>
          <el-menu-item @click="toData">
            <span slot="title">结果集</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>镜像仓库</span>
          </template>
          <el-menu-item @click="toImages">
            <span slot="title">镜像管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-files"></i>
            <span>文件服务</span>
          </template>
          <el-menu-item @click="toFile">
            <span slot="title">文件管理</span>
          </el-menu-item>
          <el-menu-item>
            <span slot="title">在线IDE</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {}
  },
  methods: {
    toJob() {
      this.$router.push({ name: 'job' })
    },
    toData() {
      this.$router.push({ name: 'data' })
    },
    toImages() {
      this.$router.push({ name: 'images' })
    },
    toFile() {
      this.$router.push({ name: 'file' })
    },
  },
}
</script>

<style scoped>
.el-menu {
  min-height: 780px;
}
</style>
