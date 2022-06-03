<template>
  <div style="position: absolute;">
    <el-menu
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <span class="font">AI/大数据应用支撑平台</span>
      <el-submenu index="1" style="margin-left: 1250px;">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
        </template>
        <el-menu-item class="my-menu" index="1-1" style="min-width:30px">
          <i class="el-icon-edit"></i>修改密码
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="2">Logout</el-menu-item>
    </el-menu>
  </div>
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
