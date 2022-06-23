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
                  <el-input v-model="verifyPassword" show-password placeholder="请输入密码" size="small"></el-input>
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
                    <el-button
                      type="success"
                      size="small"
                      @click="goRegist"
                    >注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
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
 
<script>
import { reqUserRegist } from '@/api'
import AES from '@/utils/crypto'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      verifyPassword: '',
    }
  },
  methods: {
    goLogin() {
      this.$router.push({ name: 'login' })
    },
    async goRegist() {
      let reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{8,18}$/
      if (this.user.username) {
        if (!reg.test(this.user.password)) {
          this.$message({
            message: '1.密码必须由字母、数字组成，区分大小写2.密码长度为8-18位',
            type: 'warning',
          })
        } else if (this.verifyPassword != this.user.password) {
          this.$message({
            message: '两次密码不一致',
            type: 'warning',
          })
        } else {
          let user = {
            username: '',
            password: '',
          }
          user.username = AES.encrypt(this.user.username)
          user.password = AES.encrypt(this.user.password)
          //发送请求
          let result = await reqUserRegist(user)
          if (result.code == '200') {
            this.$message({
              message: '注册成功',
              type: 'success',
            })
            this.$router.push({ name: 'login' })
          } else if (result.code == '205') {
            this.$message.error('用户名重复')
          }
        }
      } else {
        this.$message({
          message: '用户名不能为空!',
          type: 'warning',
        })
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
  opacity: 0.8;
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
  margin-right: 40px;
  margin-top: 18px;
  font-size: 20px;
  font-style: oblique;
  color: #409eff;
}
</style>