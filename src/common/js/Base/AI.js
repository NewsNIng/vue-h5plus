class AI {
  constructor(
    nickName = 'oldAI', //AI名称 默认 老AI
    newFutrue, //AI 处理源 
    config
  ) {
    this.nickName = nickName
    newFutrue && this.installFuture(newFutrue)
    config && this.installConfig(config)
  }

  //请求处理源
  thinkFuture(message) {
    return this.future(message, this.config)
  }

  //安装处理源
  installFuture(newFutrue) {
    this.future = newFutrue || function () {
      return new Promise((re, rj) => {
        //如果AI没有处理源，则返回错误信息
        rj({
          code: 233,
          // message: 'Sorry, I Have No Future'  // AI 不会说话，只会返回错误编码
        })
      })
    }
  }

  //安装配置
  installConfig(_config){
    this.config = Object.assign(this.config || {}, _config)
  }


}

module.exports = AI
