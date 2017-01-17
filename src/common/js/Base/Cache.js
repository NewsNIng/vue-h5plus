

class CacheBase {

    constructor(cacheKey = '__this_is_cache__',{
         plus = false,
    } = {}) {
        this.key = cacheKey
        this.plus = plus
    }

    

    storage(key, val){
        return val ? (this.plus ? plus.storage.setItem(key, val) : window.localStorage.setItem(key, val)) : (this.plus ? plus.storage.getItem(key) : window.localStorage.getItem(key))
        
    }

    isEmpty(){
        return !this.storage(this.key)
    }

    clear(){
        return this.storage(this,key,'')
    }

    get(callback) {
        let o = this.storage(this.key) || '{"type":"_null"}'
        o = this._getAfter(o)
        callback && callback(o)
        return o
    }

    set(data, callback) {
        let o = this._setBefore(data)
        this.storage(this.key, o)
        callback && callback(o)
        return o
    }

    //获取之后，再转化为相应类型
    _getAfter(op) {
        op = JSON.parse(op)
        let cs = {
            _string: function (val) {
                return val
            },
            _number: function (val) {
                return +val
            },
            _boolean: function (val) {
                return val === 'true'
            },
            _undefined: function (val) {
                return undefined
            },
            _object: function (val) {
                return JSON.parse(val)
            },
            _function: function (val) {
                return eval('(' + val + ')')
            },
            _array: function (val) {
                return JSON.parse(val)
            },
            _date: function (val) {
                return new Date(val)
            },
            _regexp: function (val) {
                return new RegExp(val)
            },
            _null: function (val) {
                return null
            }
        }
        return cs[op.type](op.value)
    }

    //保存之前，先转化为字符串
    _setBefore(obj = null) {
        let type = '_' + Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

        return function (v, t) {
            var sz = {
                _string: function (val) {
                    return val
                },
                _number: function (val) {
                    return val
                },
                _boolean: function (val) {
                    return val ? 'true' : 'false'
                },
                _undefined: function (val) {
                    return 'undefined'
                },
                _object: function (val) {
                    return JSON.stringify(val)
                },
                _function: function (val) {
                    return val.toString()
                },
                _array: function (val) {
                    return JSON.stringify(val)
                },
                _date: function (val) {
                    return val.getTime()
                },
                _regexp: function (val) {

                    return val.toString().replace(/[(^\/)|($\/)]/g, '')
                },
                _null: function (val) {
                    return 'null'
                }
            }
            return JSON.stringify({
                type: type,
                value: sz[t](v)
            })
        } (obj, type)
    }
}


class Cache extends CacheBase{
    constructor(...arg){
        super(...arg)
    }

    //打开plus模式
    plus(isOpen = true){
        this.plus = isOpen
    }

    get data(){
        return this.get()
    }

    set data(val){
        return this.set(val)
    }
}


module.exports = Cache