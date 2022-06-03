<template>
  <div class="login">
    <el-col :span="7" :offset="15">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span class="login-font">注册</span>
        </div>

        <el-form ref="loginForm" :model="user">
          <el-form-item prop="username" label="用户名">
            <label slot="label">用&nbsp;&nbsp;户&nbsp;名</label>
            <el-row>
              <el-col :span="18">
                <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon size="small"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item id="password" prop="password" label="密码">
            <label slot="label">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
            <el-row>
              <el-col :span="18">
                <el-input v-model="user.password" show-password placeholder="请输入密码" size="small"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item id="password" prop="password" label="密码">
            <label slot="label">二次确认</label>
            <el-row>
              <el-col :span="18">
                <el-input v-model="user.password" show-password placeholder="请输入密码" size="small"></el-input>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-row>
              <el-col :span="6" :offset="4">
                <el-button type="primary" @click="goLogin" size="small">返回登录</el-button>
              </el-col>
              <el-col :span="6" :offset="4">
                <router-link to="/register" style="margin-left: 20px;">
                  <el-button type="success" size="small">注册账号</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </div>
</template>
 
<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  created() {},
  methods: {
    goLogin() {
      this.$router.push({ name: 'login' })
    },
  },
}
</script>
 

<style scoped>
.login-font {
  font-size: 20px;
  color: #409eff;
}
.el-card {
  margin-top: 170px;
  opacity: 0.8;
  background-color: #aacefb;
}
.login {
  width: 100%;
  height: 800px;
  background: url('@/assets/images/bg.jpg') no-repeat;

  background-size: cover;
  overflow: hidden;
  background-color: #409eff;
}
</style>