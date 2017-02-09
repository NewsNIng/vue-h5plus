<template>
  <div>
    <mu-appbar :title="indexMusic.n">
      <mu-icon-button icon='close' slot="left" @click='close()' />
    </mu-appbar>

    <audio :src='src' autoplay></audio>
  </div>

</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import Cache from 'common/js/Base/Cache.js'
  import Broadcast from 'common/js/ning/Broadcast.js'


  const cache = new Cache('ingmusic'),
    broadcast = new Broadcast()

  export default {
    data() {
      return {
        indexMusic: {
          t: '2',
          s: -1,
          n: '',
          u: ''
        },
      }
    },
    computed: {
      src() {
        return this.indexMusic.u || 'newsning.mp3'
      }
    },
    created() {
      // 获取将要播放的一首歌的信息
      this.indexMusic = cache.data
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
        this.cw = plus.webview.currentWebview()
        alert(JSON.stringify(this.indexMusic))
      },
      close() {
        this.cw.hide('slide-out-bottom', 250)
      }
    }

  }

</script>