
//Android

class Android {
    constructor() {

    }

    // 监听来电状态
    onCall() {
        const fn = (re, rj) => {
            const receiver, main, context, TelephonyManager
            context = plus.android.importClass('android.content.Context') //上下文
            TelephonyManager = plus.android.importClass('android.telephony.TelephonyManager') //通话管理
            main = plus.android.runtimeMainActivity() //获取activity
            receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
                onReceive(context, intent) { //实现onReceiver回调函数
                    plus.android.importClass(intent);
                    let phoneNumber = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER),
                        telephony = context.getSystemService(context.TELEPHONY_SERVICE),
                        state = telephony.getCallState()
                    switch(state) {
                        case TelephonyManager.CALL_STATE_RINGING:
                            // console.log("[Broadcast]等待接电话=" + phoneNumber)
                            state = 'before'
                            break
                        case TelephonyManager.CALL_STATE_IDLE:
                            // console.log("[Broadcast]电话挂断=" + phoneNumber)
                            state = 'after'
                            break
                        case TelephonyManager.CALL_STATE_OFFHOOK:
                            // console.log("[Broadcast]通话中=" + phoneNumber)
                            state = 'ing'
                            break
                    }
                    re({
                        state,
                        number: phoneNumber,
                        action: intent.getAction()
                    })
                }
            })
            const IntentFilter = plus.android.importClass('android.content.IntentFilter'),
                Intent = plus.android.importClass('android.content.Intent'),
                filter = new IntentFilter()
            filter.addAction(TelephonyManager.ACTION_PHONE_STATE_CHANGED) //监听电话状态
            main.registerReceiver(receiver, filter) //注册监听
        }

        return new Promise(fn)
    }
}