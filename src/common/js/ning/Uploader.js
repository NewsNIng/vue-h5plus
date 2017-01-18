
class Uploader {
    constructor(url, {
        method = 'POST',// 网络请求类型
        blocksize = 102400,// 上传任务每次上传的文件块大小（仅在支持断点续传的服务有效）
        priority = 0,// 上传任务的优先级 越大越高
        timeout = 120,//上传任务超时时间 s
        retry = 3, //上传任务重试次数
        retryInterval = 30,//上传任务重试间隔时间
    } = {}){
        this.task = plus.uploader.createUpload(url,{
            method,
            blocksize,
            priority,
            timeout,
            retry,
            retryInterval,
        }, this.callBack)
        return new Promise((re, rj)=>{
            re(this)
        })
    }

    callBack(t, status){
        
    }

    /**
     * 添加 文件/数据 
     * @param {String} filePath_or_key 文件路径 / 键
     * @param {String} fileKey_or_value 文件的辨识 / 值
     * @param {Boolean} isFile 是否是文件类型
     */
    add(filePath_or_key, fileKey_or_value, isFile = false){
        let methodName = 'addData'
        if(isFile){
            option_or_value = {
                key: option_or_value
            }
            methodName = 'addFile'
        }
        this.task[methodName](filePath_or_key, fileKey_or_value)
        return this
    }


    /**
     * 开始上传
     * @param {Function} statechangedFun 上传进度改变时触发
     */
    start(statechangedFun){
        if(typeof statechangedFun === 'function'){
            this.task.addEventListener( "statechanged", statechangedFun, false )
        }
        this.task.start()
        return new Promise((re, rj)=>{
            
        })
    }

    /**
     * 枚举指定状态的上传任务列表
     */
    static getTasks(){
        return new Promise((re, rj)=>{
            plus.uploader.enumerate(re)
        })
        
    }

    static clear({
        before = true,// 未开始上传
        loading = true,// 上传中
        after = false,// 已上传完成
    } = {}){
        plus.uploader.clear( state )
    }
}