<template>
  <div>
    
    <mu-card>
      <mu-card-header :title="u.name" subTitle="呵呵">
        <mu-avatar :src="u.avaimg" slot="avatar" />
      </mu-card-header>
      <mu-card-media title="Image Title" :subTitle="u.think">
        <img :src="u.bgimg" />
      </mu-card-media>
      <mu-card-title title="Content Title" subTitle="Content Title" />
      <mu-card-text>
        散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。 调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。 似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光， 找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button label="Action 1" />
        <mu-flat-button label="Action 2" />
      </mu-card-actions>
    </mu-card>
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
        u: {
          name: '宁大大',
          think: '东方名都',
          bgimg: 'http://www.yoobig.com/wp-content/uploads/2017/01/bg.jpg',
          avaimg: 'https://sfault-avatar.b0.upaiyun.com/125/535/1255358193-5824870aaf3cb_huge256'  
        },

        
      }
    },
    methods: {}

  }

</script>
