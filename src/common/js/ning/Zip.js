// 压缩工具类
// 压缩的时间，却那么精华

class Zip {
  constructor() {

  }

  // 压缩图片
 async images(imgs = [], {
    type = 0, // 压缩模式 0 百分比压缩，1 固定大小压缩
    size = 40 //0 压缩百分比 (单位/%) 压缩大小 (单位/k)
  } = {}) {
    // 如果是单张，也做为数组处理
    if (typeof imgs === 'string') {
      imgs = [imgs]
    }
    const getWantSize = (img) => {
      return new Promise((re, rj) => {
        if (type === 1) { // 固定大小压缩模式
          //取到图片的大小
          plus.io.resolveLocalFileSystemURL(img, entry => {
            entry.getMetadata(m => {
              let k = m.size / 1024.0,
                b = +((size / k).toFixed(2))
              if (b > 1) {
                b = 100
              } else {
                b = b * 100
              }
              re(b)
            }, e => {
              re(false)
            })
          }, e => {
            re(false)
          })
        }
      })
    }

    return await (new Promise((re, rj) => {
      const _compressImage = async (index = 0) => {
        let path = imgs[index]
        if (path) {
          // 当前图片保存的路径
          let dstTemp = `_doc/tempImg/${new Date().getTime()}_${index}.jpg`,
              quality = await getWantSize(path)
          plus.zip.compressImage({
            src: path, // 源文件地址
            dst: dstTemp, // 压缩后文件地址
            overwrite: true, // 已存在是否覆盖
            format: 'jpg', // 图片类型 
            quality, // 压缩比例 (百分比)
            rotate: 0
          }, i => {
            //压缩后图片路径替换原路径
            imgs[index] = i.target
            _compressImage(++index)
          }, e => {
            //记录index为压缩失败false
            imgs[index] = false
            _compressImage(++index)
          })
        } else {
          // 返回压缩后的文件地址 数组
          re(imgs)
        }
      }
    }))


  }
}
