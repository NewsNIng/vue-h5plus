
//加速度感应
//你与TA彼此间的心跳感应

const _Acc = new WeakMap()

class Accelerometer {
    constructor({
        frequency = 1000, // 1s 间隔
        onChange = (or, options) => {} // 变化时触发
    } = {}) {
        this.Acc = plus.accelerometer.watchAcceleration(a => {
            let or = 0
            if (a.yAxis >= 5) {
                //竖屏状态
                or = 1
            } else if (Math.abs(a.xAxis) >= 5) {
                //横屏状态
                or = 2
            }
            onChange(or, a)
        }, e => {
            console.log("Acceleration error: " + e.message)
        }, {
            frequency
        })
    }

    

    clear(){
        plus.accelerometer.clearWatch(this.Acc)
    }



    get Acc(){
        return _Acc.get(this)
    }

    set Acc(o){
        _Acc.set(this, o)
    }
}