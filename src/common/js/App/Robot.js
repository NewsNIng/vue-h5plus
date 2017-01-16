import AI from '../Base/AI.js'
import {mapToUrl} from '../ning/itool.js'
import {
  robotInfo
} from '../data/Keys.js'

const _AI = new WeakMap()

class Robot {
  constructor(nickName = 'oldRobot') {
    this.nickName = nickName
    _AI.set(this, new AI(this.nickName + '_AI'))
    let future = (message, body) => {
      body.info = message
      return new Promise((re, rj) => {
        fetch(body.url, {
          method: 'POST',
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          body: mapToUrl(body)
        }).then(res=>{
          console.log(JSON.stringify(res))
          return res.json()
        }).then(data=>{
          console.log(JSON.stringify(data))
          if(data.error_code !== 0){
            rj(data)
          }
          re(data.result.text)
        }).catch(err => {
          rj(err)
        })
      })
    }

    _AI.get(this).installFuture(future)
    _AI.get(this).installConfig({
      url: robotInfo.feture,
      key: robotInfo.key
    })

    this.setMaster()

  }

  //设置一个新的主人
  setMaster(masterName = 'lowser', userid = new Date().getTime()) {
    this.masterName = masterName
    _AI.get(this).installConfig({
      userid
    })
  }

  setParams(_params = {
    loc: '', // 地点 如北京中关村
    lon: '', // 经度，东经116.234632（小数点后保留6位），需要写为116234632
    lat: '', // 纬度，北纬40.234632（小数点后保留6位），需要写为40234632
  }) {
    this.params = _params
    _AI.get(this).installConfig(_params)
  }

  //机器人想你问好哦
  sayHello() {
    return `${this.masterName}, 现在是${new Date().toLocaleString()}, 我是${this.nickName}, 有什么可以向您服务的吗?`
  }

  //向机器人发起一个问题
  sendQuestion(message) {
    return _AI.get(this).thinkFuture(message)
  }

}


module.exports = Robot
