import Cache from '../Base/Cache.js'

const url = 'http://www.djye.com/kc/data.js',
    key = '_MUSIC_LIST_',
    _lastNewTime = new WeakMap(),
    _musicLIst = new WeakMap()

class DJYE {
    constructor() {
        _lastNewTime.set(this, new Cache(`${key}_TIME_`))
        _musicLIst.set(this, new Cache(key))
    }
    get lastNewTime() {
        return _lastNewTime.get(this).data
    }
    set lastNewTime(o) {
        return _lastNewTime.get(this).data = o
    }
    get list() {
        return _musicLIst.get(this).data
    }
    set list(o) {
        return _musicLIst.get(this).data = o
    }


    // 获取网络歌曲列表
    _getNetData() {
        return new Promise((re, rj) => {
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
            .then(res=>{
                return res.text()
            })
            .then(data => {
                let js = `${data};window.sessionStorage.setItem('${key}_temp_',JSON.stringify(BList));`
                plus.webview.currentWebview().evalJS(js)
                setTimeout(() => {
                    re(JSON.parse(window.sessionStorage.getItem(key + '_temp_')))
                }, 110)
            }).catch(rj)
        })
    }

    // 获取本地歌曲列表
    getList() {
        return new Promise((re, rj) => {
            if (!this.list || !this.lastNewTime || this.lastNewTime - new Date().getTime() > 259200000) {
                this._getNetData().then(data => {
                    this.list = data
                    re(data)
                }).catch(rj)
            } else {
                re(this.list)
            }
        })


    }

}
module.exports = DJYE