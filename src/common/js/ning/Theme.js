import light from '!raw!muse-ui/dist/theme-default.css'
import dark from '!raw!muse-ui/dist/theme-dark.css'
import carbon from '!raw!muse-ui/dist/theme-carbon.css'
import teal from '!raw!muse-ui/dist/theme-teal.css'

//广播
import Broadcast from './Broadcast.js'

const _themes = new WeakMap(),
      _broadcast = new Broadcast()

class Theme{
    constructor(){
        this.init()
        //this._listenTheme()
    }
    init(){
        _themes.set(this, {
            light,
            dark,
            carbon,
            teal
        })
        this.theme = 'light'
        this._localkey = '_local_theme_key_'
    }

    //开启监听
    _listenTheme(){
        _broadcast.listen(this._localkey, e => {
            this._changeTheme(e.detail.theme)
        })
    }
    //通知其它页面
    _sendTheme(theme){
        _broadcast.send(this._localkey, { theme })
    }

    
    //加载主题
    loadTheme(themeName = false) {
      if(!themeName){
          themeName = this._getLocalKeyName()
      }
      this._sendTheme(themeName)
      this._changeTheme(themeName)
    }
    
    _getLocalKeyName(){
        return window.localStorage.getItem(this._localkey) || this.theme
    }

    _changeTheme(theme) {
      this.theme = theme
      const styleEl = this._getThemeStyle()
      styleEl.innerHTML = _themes.get(this)[theme] || ''
      window.localStorage.setItem(this._localkey, theme)
    }
     _getThemeStyle() {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.body.appendChild(styleEl)
      return styleEl
    }
    
}

module.exports = Theme