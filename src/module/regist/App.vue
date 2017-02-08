<template>
  <div class="body">
    <mu-circular-progress :size="20" v-show='ing' />
    <div class="page">
      <div class="logo">
        <mu-avatar :size='60' src="../static/img/logo.png" /><br/>
      </div>
      <div class="room">
        <mu-text-field hintText="用户名" :errorText="usernameerror" icon="face" fullWidth :maxLength='12' v-model='info.username' @textOverflow="handleUserNameOverflow" /><br/>
        <mu-text-field hintText="邮箱" :errorText="emailerror" icon="email" fullWidth :maxLength='20' v-model='info.email' @textOverflow="handleEmailOverflow" /><br/>
        <mu-text-field hintText="密码" :errorText="passworderror" type='password' icon="fingerprint" fullWidth :maxLength='16' v-model='info.password' @textOverflow="handlePassWordOverflow" /><br/>
      </div>
      <div class="btnroom">
        <mu-flexbox>
          <mu-flexbox-item :grow='1'>
            <mu-raised-button label="取消" @click='onBack' />
          </mu-flexbox-item>
          <mu-flexbox-item :grow='2'>
            <mu-raised-button class="login-button" label="注册" primary @click='onClick' />
          </mu-flexbox-item>
        </mu-flexbox>
        
        
      </div>
    </div>
  </div>
  </mu-appbar>
</template>
<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import {
    AV
  } from 'common/js/App/index.js'

  export default {
    data() {
      return {
        ing: false,
        info: {
          username: '',
          email: '',
          password: ''
        },
        usernameerror: '',
        passworderror: '',
        emailerror: '',
        error: false
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
        this.cw = plus.webview.currentWebview()
      },
      handleUserNameOverflow(isOverflow){
        this.error = isOverflow
        this.usernameerror = isOverflow ? '超过啦！！！！' : ''
      },
      handlePassWordOverflow(isOverflow){
        this.error = isOverflow
        this.passworderror = isOverflow ? '超过啦！！！！' : ''
      },
      handleEmailOverflow(isOverflow){
        this.error = isOverflow
        this.emailerror = isOverflow ? '超过啦！！！！' : ''
      },
      onBack() {
        this.cw.close()
      },
      onClick() {
        if (this.ing || this.error) {
          return false
        }
        
        this.regist()
      },
      regist() {
        this.ing = true
        let user = new AV.User()
        user.setUsername(this.info.username)
        user.setPassword(this.info.password)
        user.setEmail(this.info.email)
        user.signUp().then(loginedUser => {
          this.ing = false
            //注册成功
          this.onBack()
        }, (error => {
          this.ing = false
          plus.nativeUI.toast(JSON.stringify(error))
        }))
      }
    }

  }

</script>
<style>
  .page {
    position: absolute;
    top: 15%;
    width: 100%;
  }
  
  .logo {
    width: 100%;
    padding: 20px 0;
    text-align: center;
  }
  
  .room {
    padding: 0 30px 0 5px;
  }
  
  .room>* {
    margin: 15px 0;
  }
  
  .btnroom {
    padding: 30px 30px 15px 24px;
  }
  
  .login-button {
    width: 100%;
  }
  
  .body {
    position: fixed;
    width: 100%;
    height: 100%;
  }

</style>
