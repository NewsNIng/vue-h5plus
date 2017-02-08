import AV from 'leancloud-storage'
import { AVC } from '../data/Keys.js'

AV.init(AVC)

const _AV = new WeakMap()
const _Status = new WeakMap()

class User {
    constructor() {
        // 绑定用户
        this.user = AV.User
        this.status = AV.Status
    }

    get user() {
        return _AV.get(this)
    }
    set user(_user) {
        _AV.set(this, _user)
    }
    get status(){
        return _Status.get(this)
    }
    set status(_status) {
        _Status.set(this, _status)
    }



    //获取用户数据
    getUserData() {
        return this.user.current()
    }


    // 关注or取消关注
    follow(uorid, state = true) {
        let method = 'follow'
        if (!state) {// 如果是取消关注
            method = 'un' + method
        }
        return this.user[method](uorid)
    }

    // 获取我的粉丝列表
    getMyFans() {
        let query = this.user.current().followerQuery()
        query.include('follower')
        return query.find()
    }

    // 获取我的关注列表
    getMyfollows() {
        let query = this.user.current().followeeQuery()
        query.include('followee')
        return query.find()
    }

    // 发布一条动态
    applyStatus(content) {
        let status = new this.status()
        status.set('content', content)
        return this.status.sendStatusToFollowers(status)
    }

    // 获取我的关注动态列表
    getInboxs() {
        let query = this.status.inboxQuery(this.user)
        return query.find()
    }




}
module.exports = User