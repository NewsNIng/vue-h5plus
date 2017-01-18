import Robot from './Robot'
import Cache from '../Base/Cache.js'



// 记忆
const _Memory = new WeakMap()

// 女朋友类 O( T )O
// 你没有女票，就只能拿机器人来冒充

class GirlFriend extends Robot {
  constructor(name) {
    super(name)
      // 记忆初始化
    _Memory.set(this,new Cache('__Memory_' + this.nickName + '__'))
    this.memorydata = _Memory.get(this).data
    if(!this.memorydata){
        this.memorydata = []
        _Memory.get(this).data = []   
    }
    
  }

  sayHello() {
    let msg = this._loadMsg(`${this.masterName}~, 我是${this.nickName}, 以后请多多关照哦~`, true)
    this.appendMemory(msg)
    return msg
  }


  sendQuestion(message = '') {
    //记录主人的话
    this.appendMemory(this._loadMsg(message))
    return new Promise((re, rj) => {
      super.sendQuestion(message).then(msg => {
        msg = this._loadMsg(msg, true)
          //记录我自己的话
        this.appendMemory(msg)
        re(msg)
      }).catch(err => {
        let errmsg = this._loadMsg('糟了! 我可能有个假脑子, 一下子处理不过来.', true)
        this.appendMemory(errmsg)
        rj(errmsg)
      })
    })

  }


  // 获取记忆
  getMemory() {
    return this.memorydata
  }

  // 追加记忆
  appendMemory(_data = {}) {
    this.memorydata.push(_data)
    if(this.memorydata.length >= 100){
      console.log('.............100')
      this.memorydata = this.memorydata.splice(-100)
    }
    _Memory.get(this).data = this.memorydata
  }

  // 处理信息
  _loadMsg(msg, isMe = false) {
    return {
      from: isMe ? this.nickName : this.masterName,
      to: isMe ? this.masterName : this.nickName,
      isMe,
      message: msg,
      time: new Date().getTime()
    }
  }

}

module.exports = GirlFriend
