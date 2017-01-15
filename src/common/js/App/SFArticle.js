import Cache from '../Base/Cache.js'

const _cache = new WeakMap()

class SFArticle{
    constructor(){
        this._cache_key = 'segmentfault'
        this._init()
    }

    _init(){
        _cache.set(this, new Cache(this._cache_key))
    }

    setLocalData(data){
        return _cache.get(this).data = data
    }

    getLocalData(){
        return _cache.get(this).data || []
    }

    
}
module.exports = SFArticle