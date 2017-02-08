<template>
  <div class="body">
    <mu-circular-progress :size="20" v-show='ing' />
    <!--<mu-icon-button icon="clear" v-show='!ing' @click='onClose'/>-->
    <div class="page">
      <div class="logo">
        <mu-avatar :size='60' src="../static/img/logo.png" /><br/>
      </div>
      <div class="room">
        <mu-text-field hintText="用户名" :errorText="usernameerror" icon="face" fullWidth :maxLength='12' v-model='info.username' @textOverflow="handleUserNameOverflow" /><br/>
        <mu-text-field hintText="密码" :errorText="passworderror" type='password' icon="fingerprint" fullWidth :maxLength='16' v-model='info.password' @textOverflow="handlePassWordOverflow" /><br/>
      </div>
      
      <div class="btnroom">
        <mu-flexbox>
         
          <mu-flexbox-item :grow='2'>
            <mu-raised-button class="login-button" label="登录" primary @click='onClick' />
          </mu-flexbox-item>
           <mu-flexbox-item :grow='1'>
            <mu-raised-button label="注册" @click='onRegist' />
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
          password: ''
        },

        usernameerror: '',
        passworderror: '',
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
      onRegist() {
        let url = 'regist.html'
        plus.webview.create(url, url).show('pop-in', 250)
      },
      goHome() {
        let url = 'index.html',
          w = plus.webview.getWebviewById(url)
        if (!w) {
          w = plus.webview.create(url, url)
        }
        w.show('pop-in', 250)

      },
      onClose(){
        this.cw.close()
      },
      onClick() {
        if (this.ing || this.error) {
          return false
        }
        this.login()
      },
      login() {
        this.ing = true

        AV.User.logIn(this.info.username, this.info.password).then(loginedUser => {
          this.ing = false
          plus.nativeUI.toast('登录成功.')
          this.goHome()
        }, error => {
          this.ing = false
          plus.nativeUI.toast(JSON.stringify(error))
        })
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
.mu-flexbox .mu-flexbox-item:first-child{
  margin-left: 8px !important;
}
</style>
