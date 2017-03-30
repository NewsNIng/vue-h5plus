<template>
  <mu-appbar title="栗子">
  <mu-icon-button icon='menu' slot="left"/>
  <mu-icon-button icon='expand_more' slot="right"/>
</mu-appbar>
</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js' 

  export default {
    data() {
      return {
      }
    },
    created(){
      plusReady(this.plusReady)
    },
    methods: {
      plusReady(){
        
      }
    }
     
  }

</script>

