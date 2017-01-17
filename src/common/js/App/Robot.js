import AI from '../Base/AI.js'

import {mapToUrl} from '../ning/itool.js'
import {
  robotInfo
} from '../data/Keys.js'

// AI
const _AI = new WeakMap()




class Robot {
  constructor(nickName = 'oldRobot') {
    //为机器人设置名称
    this.nickName = nickName
    //为机器人的生成一个AI 并设置一个AI名称
    _AI.set(this, new AI(this.nickName + '_AI'))

    //初始化一个处理源
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
    //为机器人AI安装这个处理源
    _AI.get(this).installFuture(future)
    //同步一些配置
    _AI.get(this).installConfig({
      url: robotInfo.feture,
      key: robotInfo.key
    })

    //机器人准备完毕
    
    //设置默认主人
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

  //机器人向你问好
  sayHello() {
    return `${this.masterName}, 现在是${new Date().toLocaleString()}, 我是${this.nickName}, 有什么可以向您服务的吗?`
  }

  //向机器人发起一个问题
  sendQuestion(message) {
    //交给AI处理
    return _AI.get(this).thinkFuture(message)
  }



}


module.exports = Robot
