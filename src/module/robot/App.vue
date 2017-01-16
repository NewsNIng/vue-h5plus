<template>
  <div>
  <mu-appbar title="老机器">
  <mu-icon-button icon='menu' slot="left"/>
</mu-appbar>

<input type="text" v-model='val' >
<button @click='sendMsg()'>send</button>

<div v-for='o,i of list'>
  {{o.isMe?'我':robotName}} 说：{{o.content}}
  <br />
</div>

</div>


</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js' 

  import Robot from 'common/js/App/Robot.js'

  export default {
    data() {
      return {
        robotName: '老机器',
        list:[],
        val: '祝你鸡年大吉吧'
      }
    },
    created(){
      domReady(this.ready)
      plusReady(this.plusReady)
    },
    methods: {
      ready(){
        this.robot = new Robot(this.robotName)
        //this.robot.setMaster()
        //打招呼哦
        this.callMsg(this.robot.sayHello())
      },
      plusReady(){
        
      },
      sendMsg(){
        this.callMsg(this.val, true)
        this.robot.sendQuestion(this.val).then(this.callMsg)
        .catch(err => {
          this.callMsg(this.robot.sayHello())
        })
        this.val = ''
      },
      callMsg(msg, isMe){
        this.list.push({
          isMe,
          content: msg
        })
      }
    }
     
  }

</script>

