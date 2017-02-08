<template>
  <div>
    <mu-appbar title="朋友圈">
      <mu-icon-button icon='arrow_back' slot="left" @click='close()' />
      <mu-icon-button icon='add' slot="right" @click='apply()' />
    </mu-appbar>


    <div class="list">
      <mu-card>
        <!--<mu-card-header title="Myron Avatar" subTitle="sub title">
          <mu-avatar :src="myron" slot="avatar" />
        </mu-card-header>-->

        <mu-card-title title="NewsNing" subTitle="2017-02-06 13:14" />
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。 调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。 似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光， 找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>
        <!--<mu-card-actions>
          <mu-flat-button label="Action 1" />
          <mu-flat-button label="Action 2" />
        </mu-card-actions>-->
      </mu-card>
    </div>
  </div>
</template>
<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import User from 'common/js/App/User.js'

  import Cache from 'common/js/Base/Cache.js'

  const user = new User()

  export default {
    data() {
      return {
        list: [],
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
    },
    methods: {
      ready() {
        // 获取本地用户
        this.getTimeline()
      },
      plusReady() {
        this.cw = plus.webview.currentWebview()
      },
      close() {
        this.cw.close()
      },
      apply(){
        let url = 'share_apply.html',
        w = plus.webview.create(url, url)
        w.addEventListener('titleUpdate',()=>{
          w.show('pop-in',250)
        })
        
      },

      // 获取收件箱列表
      getTimeline() {
        user.getInboxs().then(status=>{
          //console.log(status.length)
        },err=>{

        })
      }

    },
    components: {
    }

  }

</script>
<style lang="css">

</style>