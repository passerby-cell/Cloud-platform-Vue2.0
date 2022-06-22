<template>
  <el-row>
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-col :span="5">
        <div style="text-align:center;height:60px">
          <img src="@/assets/images/favicon.png" style="height: 40px;width: 40px;margin-top:10px" />
          <span class="font">AI/大数据应用支撑平台</span>
        </div>
      </el-col>
      <el-col :span="2" :offset="15">
        <el-submenu index="1">
          <el-menu-item index="1-1">
            <i class="el-icon-edit"></i>修改密码
          </el-menu-item>
          <template slot="title">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </template>
        </el-submenu>
      </el-col>
      <el-col :span="2" style="text-align:center;">
        <el-menu-item index="2" @click="logout">Logout</el-menu-item>
      </el-col>
    </el-menu>
  </el-row>
</template>
<script>
export default {
  name: 'Header',
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
<style scoped>
.font {
  float: right;
  margin-right: 40px;
  font-size: 20px;
  font-style: oblique;
  color: #409eff;
}
</style>
