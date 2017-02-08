 import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js' 

  import {
    AV
  } from 'common/js/App/index.js'

  let url = 'index.html'
  const user = new AV.User.current()
  if(!user || !user.objectId){
    url = 'login.html' 
  }
  plusReady(() => {
    let w = plus.webview.create(url,url)
    w.addEventListener('titleUpdate',() => {
      plus.navigator.closeSplashscreen()
    })
    w.show('none')
  })

