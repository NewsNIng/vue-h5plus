
import Back from './Back.js'
import Broadcast from './Broadcast.js'

const plusready = function(fn){
    if (window.plus) {
      setTimeout(fn, 0)
    } else {
      document.addEventListener("plusready", fn, false)
    }
}

//开启监听返回键
plusready(()=>{
  let back = new Back()
  new Broadcast().listen('_backbutton', e => {
    console.log(e.detail.wid+'_通知_'+e.detail.pid+'_触发返回事件_')
    back.keyDown()
  })
})


module.exports = plusready