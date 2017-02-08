<template>
  <div>
    <mu-appbar :title="tabs[activeIndex].title">
      <!--<mu-icon-button icon='menu' slot="left" @click='menu' />-->
      <mu-icon-button icon='music' slot="right" />
    </mu-appbar>

    <mu-paper>
      <mu-bottom-nav :value="activeIndex" shift @change="handleTabChange">
        <mu-bottom-nav-item v-for='t,i of tabs' :value='i' :icon="t.icon" :title='t.title' />
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
  import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js'

  import Broadcast from 'common/js/ning/Broadcast.js'
  import webviewGroup from 'common/js/ning/WebviewGroup.js'

  export default {
    data() {
      return {
        activeIndex: 0,
        tabs: [
          {
            title: '主页',
            icon: 'home',
            src: 'home.html'
          },
          {
            title: '盒子',
            icon: 'touch_app',
            src: 'box.html'
          },
          {
            title: '我的',
            icon: 'account_box',
            src: 'menu.html'
          }
        ],
        style: {
          top: '56px',
          bottom: '51px',
          popGesture: 'none'
        },
        isShow: false,
        menuPage: null,
        mask: null
      }
    },
    created() {
      plusReady(this.plusReady)
      new Broadcast().listen('_hideMenu', (e) => {
        this.isShow = false
      })
    },
    methods: {
      plusReady() {
        this.cw = plus.webview.currentWebview()
        let that = this
        
        let items = []
        for(let i in this.tabs){
          items.push({
            id: this.tabs[i].src,
            url: this.tabs[i].src,
            extras: {},
            styles: this.style
          })
        }
        this.group = new webviewGroup(this.cw.id, {
          items,
          onChange(obj) {
            that.activeIndex = obj.index
          }
        })

        //默认载入
        //this.showSubPage(this.activeIndex)
        // 侧滑初始化
        //this.menuInit()

      },
      //左上角菜单
      menu() {
        this.isShow = true
      },
      menuInit() {
        //设置遮罩点击事件
        this.cw.addEventListener("maskClick", () => {
          this.isShow = false
        })
        //预加载侧滑菜单
        let url = 'menu.html'
        this.menuPage = plus.webview.create(url, url, {
          left: '-70%',
          width: '70%',
          zindex: 9997,
          popGesture: 'none'
        })
      },
      _showMenu() {
        this.menuPage.show('none', 0, () => {
          this.cw.setStyle({
            left: '70%',
            transition: {
              duration: 150
            },
            mask: 'rgba(0,0,0,0.35)'
          })
          this.menuPage.setStyle({
            left: '0%',
            transition: {
              duration: 150
            }
          })
        })
      },
      _hideMeun() {
        this.cw.setStyle({
          left: '0',
          transition: {
            duration: 150
          }
        })
        this.menuPage.setStyle({
          left: '-70%',
          transition: {
            duration: 150
          }
        })
        this.cw.setStyle({ mask: "none" })
        setTimeout(() => {
          this.menuPage.hide()
        }, 200);
      },

      handleTabChange(index) {
        this.activeIndex = index
        return this.group.switchTab(this.tabs[index].src)
        this.showSubPage(index)
        this.hideSubPage()
        
      },
      showSubPage(index = 0) {
        let id = this.tabs[index].src,
          want = plus.webview.getWebviewById(id)
        if (!want) {
          want = plus.webview.create(id, id, this.style)
          want.hide()
          this.cw.append(want)
          want.show("fade-in", plus.os.ios ? 300 : 700)
          return want
        }
        if (!want.isVisible()) {
          want.show('none')
        }
        return want
      },
      hideSubPage(index) {
        plus.webview.hide(this.tabs[this.activeIndex].src)
      }

    },
    watch: {
      isShow(n) {
        if (this.isShow) {
          this._showMenu()
        } else {
          this._hideMeun()
        }
      }
    }
  }

</script>
<style scoped>
  .mu-tabs,
  .mu-paper {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
</style>