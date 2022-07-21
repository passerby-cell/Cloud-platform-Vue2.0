<template>
  <div>
    <div class="login">
      <el-row>
        <el-menu
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-col :span="5">
            <div style="text-align:center;height:60px">
              <img
                src="@/assets/images/favicon.png"
                style="height: 40px;width: 40px;margin-top:10px"
              />
              <span class="font">AI/大数据应用支撑平台</span>
            </div>
          </el-col>
        </el-menu>
      </el-row>
      <el-col :span="7" :offset="15">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span class="login-font">登录</span>
          </div>

          <el-form ref="loginForm" :model="user">
            <el-form-item prop="username" label="用户名">
              <el-row>
                <el-col :span="18" :offset="1">
                  <el-input v-model="user.username" placeholder="请输入用户名" prefix-icon size="small"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item id="password" prop="password" label="密码">
              <label slot="label">密&nbsp;&nbsp;&nbsp;码</label>
              <el-row>
                <el-col :span="18" :offset="1">
                  <el-input v-model="user.password" show-password placeholder="请输入密码" size="small"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item>
              <el-row>
                <el-col :span="6" :offset="4">
                  <el-button
                    type="primary"
                    @click="doLogin()"
                    size="small"
                  >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
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
    <div style="text-align: center; font-size:16px;height: 60px;background-color: #B6C0CF;">
      <p style="padding-top:22px">2022&copy;Cloud@NUIST</p>
    </div>
  </div>
</template>
 
<script scoped>
import AES from '@/utils/crypto'
import { reqUserLogin } from '@/api'
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

  methods: {
    async doLogin() {
      if (!localStorage.getItem('token')) {
        let user = {
          username: '',
          password: '',
        }
        user.username = AES.encrypt(this.user.username)
        user.password = AES.encrypt(this.user.password)
        let result = await reqUserLogin(user)
        if (result.code == '200') {
          this.$message({
            message: '登陆成功',
            type: 'success',
          })
          localStorage.setItem('userid', result.data.id)
          this.$router.push({ name: 'job' })
        } else {
          this.$message.error(result.message)
        }
      } else {
        this.$router.push({ name: 'job' })
      }
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
  opacity: 0.7;
  background-color: #aacefb;
}
.login {
  width: 100%;
  height: 800px;
  background: url('@/assets/images/bg.jpg') no-repeat;
  background-size: cover;
  overflow: hidden;
}
.font {
  float: right;
  font-size: 20px;
 /* margin-right: 40px; */
  font-style: oblique;
  color: #409eff;
  margin-top: 20px;
}
</style>