 import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js' 

  import {
    AV
  } from 'common/js/App/index.js'

  let url = 'index.html'
  const user = AV.User.current()
  // 未登录时跳转登录
  if(!user || !user.id){
    url = 'login.html' 
  }
  plusReady(() => {
    let w = plus.webview.create(url,url)
    w.addEventListener('titleUpdate',() => {
      plus.navigator.closeSplashscreen()
    })
    w.show('none')
  })

