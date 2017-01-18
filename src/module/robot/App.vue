<template>
  <div>
    <mu-appbar :title="robotInfo.name">
      <mu-icon-button icon='arrow_back' slot="left" @click='close()' />
    </mu-appbar>
    <div class="fixed">
      <mu-flexbox>
        <mu-flexbox-item grow='8'>
          <mu-text-field :fullWidth='true' v-model='val' :hintText="tip" />
        </mu-flexbox-item>
        <mu-flexbox-item style="text-align: center">
          <mu-float-button icon="send" :mini='true' class="demo-right-button" @click='sendMsg()' />
        </mu-flexbox-item>
      </mu-flexbox>
    </div>
    <div class="chatList">
      <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="down" />
      <mu-list>
        <template v-for='o,i of list'>
          <chat-item :avatar='o.isMe?robotInfo.avatar:masterInfo.avatar' :content='o.message' :self='!o.isMe' :time='o.time' :showTime='true'></chat-item>
        </template>
        

        <!--<template v-for='o,i of list'>
          <mu-list-item :title="o.from + _time2time(o.time)" :style="{'text-align': o.isMe?'left':'right'}">
            <mu-avatar :src="o.isMe?robotInfo.avatar:masterInfo.avatar" :slot="o.isMe?'leftAvatar':'rightAvatar'" />
            <span slot="describe">
              {{o.message}}
            </span>
          </mu-list-item>
          <mu-divider inset/>
        </template>-->
      </mu-list>
    </div>
  </div>
</template>
<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import GF from 'common/js/App/GirlFriend.js'
  import Cache from 'common/js/Base/Cache.js'

  import chatItem from 'components/Chat/item.vue'

  export default {
    data() {
      return {
        robotInfo: {
          name: '楠の幸子',
          avatar: 'https://sfault-avatar.b0.upaiyun.com/422/013/4220137036-586deaee61646_huge256'
        },
        masterInfo: {
          name: '宁大大',
          avatar: 'https://sfault-avatar.b0.upaiyun.com/125/535/1255358193-5824870aaf3cb_huge256'
        },
        list: [],
        val: '',
        tip: '说点什么吧~',
        lastTime: 0,


        refreshing: false,
        trigger: null
      }
    },
    created() {
      domReady(this.ready)
      plusReady(this.plusReady)
    },
    mounted() {
      this.room = document.querySelector('.chatList')
      this.input = document.querySelector('input')
      this.trigger = this.$el
      this.input.onfocus = ()=>{
        this._chat2down(500)
      }
    },
    methods: {
      ready() {
        //先去本地找找看有没有 女朋友记录
        //let cc = new Cache('my_friends')



        // new 一个女朋友...
        this.gf = new GF(this.robotInfo.name)
        
        // 设置她称呼的方式 
        this.gf.setMaster(this.masterInfo.name)

        // 先看看她以前跟我说过啥哟
        let memorydata = this.gf.getMemory()
        // 如果以前没跟她说过话 那就让她主动给我打招呼
        if (!memorydata.length) {
          // 哈哈叫哥哥
          this.callMsg(this.gf.sayHello())
        }else{
          // 有说过话就显示最近10条 
          this.list.push(...(memorydata.slice(-10)))
          // 并且滚动到底部
          this._chat2down()
        }
        
        
      },
      plusReady() {
        this.cw = plus.webview.currentWebview()
        //设置键盘弹出webview的样式
        // this.cw.setStyle({
        //   softinputMode: 'adjustResize'
        // })
      },
      sendMsg() {
        if (!this.val.trim()) {
          return
        }
        this.callMsg(this.gf._loadMsg(this.val))
        this.gf.sendQuestion(this.val).then(this.callMsg)
          .catch(this.callMsg)
        this.val = ''
      },
      callMsg(_data) {
        this.list.push(_data)
        this._chat2down()
        this.lastTime = new Date().getTime()
      },
      down() {
        this.refreshing = true
        setTimeout(() => {
          this.refreshing = false
        }, 2000)
      },
      _chat2down(time = 0){
        setTimeout(() => {
          this.room.scrollTop = this.room.scrollHeight
        }, time)
      },
      onFocus(){
        alert(0)
        this._chat2down()
      },
      close() {
        this.cw.close()
      }
    },
    components:{
      chatItem
    }

  }

</script>
<style lang="css">
  .fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 5%;
    height: 50px;
    z-index: 102;
  }
  
  .chatList {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    top: 56px;
    bottom: 50px;
    left: 0;
    width: 100%;
  }

  .tright{
    position: absolute;
    right: 16px;
    top: 13px;
    margin: 0;
  }
  .tleft{
    position: absolute;
    left: 16px;
    top: 13px;
    margin: 0;
  }

</style>