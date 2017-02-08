<template>
  <div>
    <mu-select-field fullWidth v-model="game1" :labelFocusClass="['label-foucs']" label="选择你喜欢的游戏">
      <mu-menu-item v-for="text,index in list" ccc="dddd" ttt="ddd" :value="String(index)" :title="text" />
    </mu-select-field>
    <mu-time-picker fullWidth hintText="嗨到最晚的时间" format="24hr" /><br/>
    <mu-raised-button label="点击跟女友聊天" class="demo-raised-button" @click='chatClick()' />
    <mu-raised-button label="朋友圈" @click='shareClick()' />
  </div>
</template>
<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  export default {
    data() {
      return {
        game1: '-1',
        game2: ['1'],
        game3: '3',
        list: []
      }
    },
    mounted() {
      setTimeout(() => {
        this.list = ['阴阳师', '影之刃', '天下HD', '穿越火线', '英雄联盟', '王者荣耀']
      }, 20)
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {

      },
      chatClick() {
        let page = 'robot.html',
          ow = plus.webview.create(page, page, {
            popGesture: 'close'
          })
        ow.onloading = () => {
          ow.show('pop-in', 250)
        }

      },
      shareClick() {
        let url = 'share.html',
          w = plus.webview.create(url, url, {
            popGesture: 'close'
          })
        w.addEventListener('titleUpdate', () => {
          w.show('pop-in', 250)
        })

      }
    },


  }

</script>