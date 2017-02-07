
let webviewGroup = (function () {

  class WebviewGroupContext {

    constructor(id, webviewOptions, groupContext) {
      this.id = id
      this.url = webviewOptions.url
      this.options = webviewOptions
      this.groupContext = groupContext

      this.webview = false
      this.inited = false
    }

    // 创建一个新的webview
    createWebview(from) {
      let options = this.options

      options.styles = options.styles || {
        top: "83px",
        bottom: "0px",
        render: "always"
      }
      options.styles.popGesture = 'none'
      if (this.webview) {
        this.webview.setStyle(options.styles)
        for (let key in options.extras) {
          this.webview[key] = options.extras[key]
        }
      } else {
        options.styles.left = '100%'
        if (from !== 'startAnimation') {
          options.styles.left = '0'
          plus.nativeUI.showWaiting()
        }
        this.webview = plus.webview.create(this.url, this.id, options.styles, options.extras)
          //append进去，避免返回时闪屏
        plus.webview.currentWebview().append(this.webview)
      }
      this._initWebview()
      this.inited = true
    }

    // 初始化webview
    _initWebview() {
      let options = this.options
      if (!this.webview) {
        return
      }
      this.webview.addEventListener('rendering', function () {
        setTimeout(function () {
          plus.nativeUI.closeWaiting()
        }, 500)
      })
      if (options.pullToRefresh && options.pullToRefresh.support && support.pullToRefresh()) {
        var callback = options.pullToRefresh.callback
        this.webview.setPullToRefresh(options.pullToRefresh, () => {
          if (callback) { //如果指定了下拉回调
            callback(this.webview)
          } else { //下拉刷新回调，默认reload当前页面
            let titleUpdate = function () {
              setTimeout(() => {
                this.webview.endPullToRefresh()
              }, 1000)
              this.webview.removeEventListener('titleUpdate', titleUpdate);
            };
            this.webview.addEventListener('titleUpdate', titleUpdate)
            this.webview.reload()
          }
        })
      }
    }

  }

  class WebviewGroup {

    constructor(id, {
      items = [],
      index = 0,
      styles = {},
      onChange = () => {}
    }) {
      this.id = id
      this.options = {
        items,
        index,
        styles,
        onChange
      }
      this.styles = styles;
      this.items = items;
      this.onChange = onChange

      this.webviews = {}
      this.webviewContexts = {}
      this.currentWebview = false
      this._init()
    }

    // 初始化
    _init() {
      this._initParent()
      this._initNativeView()
      this._initWebviewContexts(this.options.index)
    }

    // 初始化父窗体
    _initParent() {
      this.parent = plus.webview.getWebviewById(this.id);
      if (!this.parent) {
        this.parent = plus.webview.create(this.id, this.id)
        this.parent.show('none')
      }

    }

    // 初始化原生view
    _initNativeView() {
      this.nativeView = new plus.nativeObj.View('__W2A_TAB_NATIVE', {
        'top': '56px',
        //'bottom': "0px",//原生 view bottom 属性无效
        'left': '100%',
        'width': '100%',
        'backgroudColor': '#ffffff',
        'opacity': 0 //修复遮盖
      })
      this.nativeView.show()
    }

    // 初始化子页
    _initWebviewContexts() {
      for (let len = this.items.length, i = len - 1; i >= 0; i--) {
        let webviewOptions = this.items[i],
          id = webviewOptions.id,
          isFirst = i === 0,
          isLast = i === (len - 1),
          isCurrent = this.options.index === i,
          extras = webviewOptions.extras
        extras.__wap2app_url = webviewOptions.url
        extras.__wap2app_index = i

        extras.__wap2app_left = isFirst ? '' : this.items[i - 1].id
        extras.__wap2app_right = isLast ? '' : this.items[i + 1].id

        let styles = webviewOptions.styles || {}

        if (i > this.options.index) {
          styles.left = '100%';
        } else if (i < this.options.index) {
          styles.left = '-100%'
        } else {
          styles.left = '0'
        }
        let webviewContext = new WebviewGroupContext(id, webviewOptions, this)
        this.webviewContexts[id] = webviewContext
        if (isCurrent) {
          webviewContext.webview = plus.webview.getWebviewById(id)
          webviewContext.createWebview()
          webviewContext.webview.show("none")
          this._initDrags(webviewContext.webview)
          this.currentWebview = webviewContext.webview
        }
      }
    }

    // 初始化滑动
    _initDrag(webview, dir) {
      let flag = `__wap2app_drag_${dir}_flag`
      if (webview[flag]) {
        return
      }
      let viewId = webview['__wap2app_' + (dir === 'left' ? 'right' : 'left')]
      if (viewId) {
        let view = plus.webview.getWebviewById(viewId)
        if (!view) { //如果目标webview不存在,使用nativeView替换
          view = this.nativeView
        } else {
          webview[flag] = true
        }
        webview.drag({
            'direction': dir,
            'moveMode': 'followFinger'
          }, {
            'view': view,
            'moveMode': 'follow'
          },
          function (res) {
            if (res.type === 'end' && res.result) { //拖拽完成
              this._dragCallback(dir, webview, view, viewId)
            }
          }.bind(this)
        )
      } else {
        webview[flag] = true
      }
    }

    _initDrags(webview) {
      this._initDrag(webview, 'left')
      this._initDrag(webview, 'right')
    }

    _onChange(webview) {
      this.currentWebview = webview;
      this.onChange({
        index: webview.__wap2app_index
      })
    }

    _dragCallback(dir, fromWebview, view, viewId) {
      if (view === this.nativeView) { //需要创建webview
        //第一步:初始化目标webview
        this.webviewContexts[viewId].createWebview('drag')
        var targetWebview = this.webviewContexts[viewId].webview
        targetWebview.show()
        this.nativeView.setStyle({
            left: '100%'
          })
          //第二步:初始化目标webview的drag
        this._initDrags(targetWebview)
        this._onChange(targetWebview)
          //第三步:校验目标webview的左右webview的drag初始化
        this._checkDrags(targetWebview)
      } else {
        this._onChange(view)
      }
    }

    _checkDrags(webview) {
      let left = webview.__wap2app_left,
        right = webview.__wap2app_right
      if (left) {
        var leftWebview = plus.webview.getWebviewById(left)
        if (leftWebview && !leftWebview.__wap2app_drag_left_flag) {
          this._initDrag(leftWebview, 'left')
        }
      }
      if (right) {
        var rightWebview = plus.webview.getWebviewById(right)
        if (rightWebview && !rightWebview.__wap2app_drag_right_flag) {
          this._initDrag(rightWebview, 'right')
        }
      }
    }

    getCurrentWebview() {
      return this.currentWebview
    }

    getCurrentWebviewContext() {
      if (this.currentWebview) {
        return this.webviewContexts[this.currentWebview.id]
      }
      return false
    }

    switchTab(id) {
      id = id.replace('_0', '') //首页需要替换为appid
      let fromWebview = this.currentWebview
      if (id === fromWebview.id) {
        return
      }
      let toWebviewContext = this.webviewContexts[id],
        toWebview = toWebviewContext.webview,
        fromToLeft = '100%',
        toFromLeft = '-100%'
      if (toWebviewContext.options.extras.__wap2app_index > fromWebview.__wap2app_index) {
        fromToLeft = '-100%'
        toFromLeft = '100%'
      }
      let isNew = false
      if (!toWebview) {
        isNew = true
        toWebviewContext.createWebview('startAnimation')
        toWebview = toWebviewContext.webview
          // toWebview.showBehind(plus.webview.getSecondWebview());
        toWebview.show()
        this._initDrags(toWebview)
        this._checkDrags(toWebview) //新建的时候均需校验
      }

      // toWebview.show("none");
      // console.log("current:" + fromWebview.id + ",to:" + fromToLeft)
      // console.log("next:" + toWebview.id + ",from:" + toFromLeft)
      // console.log("current_fromToLeft:"+fromToLeft+",nexttoFromLeft:"+toFromLeft)

      plus.webview.startAnimation({
          'view': fromWebview,
          'styles': {
            'fromLeft': '0',
            'toLeft': fromToLeft
          },
          'action': 'show'
        }, {
          'view': toWebview,
          'styles': {
            'fromLeft': toFromLeft,
            'toLeft': '0'
          },
          'action': 'show'
        },
        function (e) {
          if (e.id === toWebview.id) {
            isNew && plus.nativeUI.showWaiting()
            this.currentWebview = toWebview
            this.onChange({
              index: toWebview.__wap2app_index
            })
          }
        }.bind(this)
      )
    }


  }



  return WebviewGroup


})()


module.exports = webviewGroup
