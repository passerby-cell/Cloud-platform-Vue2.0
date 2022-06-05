<template>
  <el-row>
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-col :span="2" :offset="1">
        <span class="font">AI/大数据应用支撑平台</span>
      </el-col>
      <el-col :span="2" :offset="20">
        <el-submenu index="1">
          <el-menu-item index="1-1">
            <i class="el-icon-edit"></i>修改密码
          </el-menu-item>
          <template slot="title">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </template>
        </el-submenu>
      </el-col>
      <el-col :span="1">
        <el-menu-item index="2">Logout</el-menu-item>
      </el-col>
    </el-menu>
  </el-row>
</template>
<script>
export default {
  name: 'Header',
}
</script>
<style scoped>
.font {
  position: absolute;
  margin-left: 30px;
  font-size: 16px;
  font-style: oblique;
  color: #409eff;
}
</style>
