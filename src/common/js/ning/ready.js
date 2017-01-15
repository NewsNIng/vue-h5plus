//主题
import Theme from './Theme.js'

 //加载默认主题
	let t = new Theme()
	t.loadTheme()
	t._listenTheme()

//domReady
const ready = function (fn) {
	let readyRE = /complete|loaded|interactive/
	if (readyRE.test(document.readyState)) {
		setTimeout(fn, 0)
	} else {
		document.addEventListener('DOMContentLoaded', fn)
	}
	return this
}

ready(()=>{
   
})

module.exports = ready