<template>
  <div>
    <mu-appbar title="侧滑菜单">
    </mu-appbar>

    <mu-card>
      <!--<mu-card-header :title="u.name" :subTitle="u.think">
        <mu-avatar :src="u.avaimg" slot="avatar" />
      </mu-card-header>-->
      <mu-card-media :title="u.name" :subTitle="u.think">
        <img :src="u.bgimg" />
      </mu-card-media>

    </mu-card>

    <mu-menu class="demo-menu-divider">
      <!--<mu-menu-item title="注销" leftIcon="account_circle" @click='onClick'/>-->
      <mu-divider />
      <mu-menu-item title="调戏女朋友" leftIcon="settings" @click='onSetting' />
      <mu-divider />
      <mu-menu-item title="换肤" leftIcon="remove_red_eye" @click='onThemeClick' />
      <mu-divider />
      <mu-menu-item title="退出" leftIcon="power_settings_new" @click='onClose' />
    </mu-menu>


  </div>


</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'
  import Back from 'common/js/ning/Back.js'
  import Broadcast from 'common/js/ning/Broadcast.js'
  import Theme from 'common/js/ning/Theme.js'

  export default {
    data() {
      let themes = [
        'light',
        'dark',
        'carbon',
        'teal'
      ],
        sub = []
      for (let item of themes) {
        sub.push({
          name: item
        })
      }
      return {
        menus: [
          {
            name: '换肤',
            icon: 'remove_red_eye',
            auto: true,
            sub,
          },
          {
            name: '关于',
            icon: 'inbox'
          }
        ],



        index: 0,
        themes,
        t: null,
        u: {
          name: '宁大大',
          think: '我打你个东方名都~',
          bgimg: 'http://www.yoobig.com/wp-content/uploads/2017/01/bg.jpg',
          avaimg: 'https://sfault-avatar.b0.upaiyun.com/125/535/1255358193-5824870aaf3cb_huge256'
        },
      }
    },
    created() {
      this.t = new Theme()
      plusReady(this.plusReady)
    },
    methods: {
      plusReady() {
        this.cw = plus.webview.currentWebview()
        new Back(this.onHide).addKeyListener()
      },
      onClick() {
        let url = 'login.html',
          w = plus.webview.create(url, url)
        this.cw.setStyle({ left: '-70%' })
        w.onloaded = () => {
          this.onHide()
        }
        w.show('pop-in', 250)

      },
      onThemeClick() {
        this.index++
      },
      onHide() {
        new Broadcast().send('_hideMenu', {}, { ids: ['index.html'] })
      },
      onClose() {
        plus.runtime.quit()
      },
      onSetting() {
        let page = 'robot.html',
          w = plus.webview.create(url, url, {
            popGesture: 'close'
          })
        w.addEventListener('titleUpdate', () => {
          w.show('pop-in', 250)
        })
      }
    },
    watch: {
      index(n, o) {
        if (n >= this.themes.length) {
          this.index = 0
        }
        this.t.loadTheme(this.themes[this.index])
      }
    }

  }

</script>

<style lang="css">
  .header {
    padding: 10px 0;
  }
</style>