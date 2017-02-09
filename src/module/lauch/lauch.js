 import {
    domReady,
    plusReady
  } from 'common/js/ning/index.js' 


  let url = 'index.html'
  
  plusReady(() => {
    let w = plus.webview.create(url,url)
    w.addEventListener('titleUpdate',() => {
      plus.navigator.closeSplashscreen()
    })
    w.show('none')
  })

