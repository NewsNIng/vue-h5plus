let mapToUrl = function(obj){
    let sArray = new Set()
    for (let i in obj) {
		sArray.add(i + '=' +encodeURIComponent(obj[i]))
	}
	return Array.from(sArray).join('&')
}


export{
    mapToUrl

}