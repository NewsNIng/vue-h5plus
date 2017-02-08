<template>
  <div>
    <mu-appbar title="发布新动态">
      <mu-icon-button icon='arrow_back' slot="left" @click='close()' />
      <mu-icon-button icon='send' slot="right" @click='send()' />
    </mu-appbar>

    <mu-text-field hintText="说点什么呢~" multiLine :rows="3" :rowsMax="6" v-model='content' fullWidth /><br/>
  </div>
</template>
<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import User from 'common/js/App/User.js'

  const user = new User()

  export default {
    data() {
      return {
        content: ''
      }
    },
    created() {
      domReady(this.ready)
      plusReady(this.plusReady)
    },
    mounted() {
    },
    methods: {
      ready() {
        
      },
      plusReady() {
        this.cw = plus.webview.currentWebview()
      },
      close() {
        this.cw.close()
      },

      //发送
      send() {
        plus.nativeUI.showWaiting('正在发送...')
        user.applyStatus(this.content).then(status => {
          plus.nativeUI.closeWaiting()
          plus.nativeUI.toast('发送动态成功~')
          this.close()
        }, err => {
          plus.nativeUI.closeWatting()
          plus.nativeUI.toast('发送失败~')
        })
      }

    },
    components: {
    }

  }

</script>
<style lang="css">

</style>