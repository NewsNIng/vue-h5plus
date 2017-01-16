<template>
  <div>
    <mu-linear-progress v-show='loading' />
    <mu-appbar :title="title">
      <mu-icon-button icon='close' slot="left" @click='close()' />
      
    </mu-appbar>
    
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
        loading: true,
        url: '',
        title: '浏览器',
        bw: null
      }
    },
    created() {
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
        this.cw = plus.webview.currentWebview()
        this.url = this.cw.url
        this.title = this.cw.title
        this.createBowser()
        this.initBowser()
      },
      close() {
        this.cw.close()
      },
      createBowser() {
        this.bw = plus.webview.create(this.url, 'bowser', {
          top: '56px',
          bottom: '0px',
          bounce: 'vertical'
        })
        this.cw.append(this.bw)
        this.bw.show()
      },
      initBowser() {
        this.bw.addEventListener('titleUpdate', (e) => {
          this.title = e.title
        })
        this.bw.addEventListener('loading', (e) => {
          this.loading = true
        })
        this.bw.addEventListener('loaded', (e) => {
          this.loading = false
        })
      }
    }

  }

</script>

<style lang="css">
  .mu-appbar{

  }
  /*进度条*/
  .mu-linear-progress{
    position: absolute !important;
    left: 0;
    top: 0;
    height: 2px !important;
    background-color: rgba(255,255,255,.35) !important;
  }

</style>