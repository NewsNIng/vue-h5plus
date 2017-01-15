<template>
  <div>
    <mu-select-field  fullWidth v-model="game1" :labelFocusClass="['label-foucs']" label="选择你喜欢的游戏">
      <mu-menu-item v-for="text,index in list" ccc="dddd" ttt="ddd" :value="String(index)" :title="text" />
    </mu-select-field>
    <mu-time-picker fullWidth hintText="嗨到最晚的时间" format="24hr" /><br/>
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
      plusReady(){

      }
    },


  }

</script>