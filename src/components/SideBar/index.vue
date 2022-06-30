<template>
  <el-row>
    <el-col :span="24">
      <el-menu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-date"></i>
            <span>我的作业</span>
          </template>

          <el-menu-item @click="toJob('标准作业')">
            <span slot="title">标准作业</span>
          </el-menu-item>
          <el-menu-item @click="toJob('MPI作业')">
            <span slot="title">MPI作业</span>
          </el-menu-item>
          <el-menu-item @click="toJob('Tensorflow作业')">
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
            <span>在线IDE</span>
          </template>
          <el-menu-item @click="startIDE">
            <span slot="title">开启IDE</span>
          </el-menu-item>
          <el-menu-item @click="stopIDE">
            <span slot="title">关闭IDE</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { Loading } from 'element-ui'
import { reqStartIDE, reqStopIDE } from '@/api'
export default {
  name: 'SideBar',
  data() {
    return {}
  },
  methods: {
    toJob(data) {
      this.$bus.$emit('getSecondBread', data)
      this.$router.push({ name: 'job' })
    },
    toData() {
      this.$router.push({ name: 'data' })
    },
    toImages() {
      this.$router.push({ name: 'images' })
    },
    async startIDE() {
      let result = await reqStartIDE(
        localStorage.getItem('token'),
        localStorage.getItem('userid')
      )
      if (result.code == '200') {
        let loading = Loading.service({
          fullscreen: true,
          text: '在线IDE加载中...',
        })
        setTimeout(() => {
          loading.close()
          window.open(result.data, '_blank')
        }, 5000)
      }
    },
    async stopIDE() {
      let result = await reqStopIDE(
        localStorage.getItem('token'),
        localStorage.getItem('userid')
      )
      if (result.code == '200') {
        this.$message({
          type: 'success',
          message: '关闭成功',
        })
      }
    },
  },
}
</script>

<style scoped>
.el-menu {
  min-height: 780px;
}
</style>
