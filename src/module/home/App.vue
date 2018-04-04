<template>
  <!--<div>
    <mu-list>
      <mu-list-item v-for='o,i of list' :title="o.title" :describeText="o.excerpt" @click='onClick(o)'>
        <mu-avatar :src="o.thumb" slot="leftAvatar" />
      </mu-list-item>
    </mu-list>
    <mu-divider/>
  </div>-->
  <div class="demo-infinite-container">
    <mu-list>
      <template v-for='o,i of list'>
        <mu-list-item :title="o.title" :describeText="o.author_name" @click='onClick(o)'>
          <mu-avatar :src="o.thumbnail_pic_s" slot="leftAvatar" />
        </mu-list-item>
      </template>
    </mu-list>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="up" :loadingText='""' />
  </div>

  <!--<div class="demo-refresh-container">
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="down"/>
    <mu-list>
      <template v-for="o,i of list">
        <mu-list-item :title="o.title" :describeText="o.excerpt" @click='onClick(o)'>
        <mu-avatar :src="o.thumb" slot="leftAvatar" />
      
        </mu-list-item>
      </template>
    </mu-list>
  </div>-->
</template>
<script>
import { domReady, plusReady } from "common/js/ning/index.js";

import SF from "common/js/App/SFArticle.js";

export default {
  data() {
    return {
      list: [],
      index: -1,
      loading: false,
      scroller: null
    };
  },
  created() {
    this.ready();
    plusReady(this.plusReady);
  },
  mounted() {
    this.scroller = this.$el;
  },
  methods: {
    ready() {
      //读取缓存
      this.sf = new SF();
      this.list.push(...this.sf.getLocalData());
      console.log("缓存数据哦：" + JSON.stringify(this.sf.getLocalData()));
      //获取网络数据 下拉
      this.index = 1;
    },
    plusReady() {
      this.cw = plus.webview.currentWebview();
    },
    onClick(item) {
      let page = "bowser.html",
        ow = plus.webview.create(
          page,
          page,
          {
            popGesture: "close"
          },
          {
            url: item.url,
            title: item.title
          }
        );
      ow.onloading = () => {
        ow.show("pop-in", 250);
      };
    },
    getNetData(isDwon) {
      let url =
        "http://v.juhe.cn/toutiao/index?type=top&key=40d3f36de706335e77684e293d10c54a";

      this.loading = true;

      this.$http
        .get(url, {
          // parmas,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(
          res => {
            let data = res.body;

            data = data.result.data;

            this.loading = false;
            if (isDwon) {
              //去重 新数据在前
              this.list = Array.from(new Set(data, this.list));
              //保存缓存数据 只保存最新的data
              this.sf.setLocalData(data);
            } else {
              this.list.push(...data);
            }
          },
          e => {
            this.loading = false;
            console.log(JSON.stringify(e));
          }
        );
    },
    //下拉
    down() {
      this.index = 1;
    },
    up() {
      this.index++;
    }
  },
  watch: {
    index(n, o) {
      this.getNetData(n === 1 || n < o);
    }
  }
};
</script>
<style lang="css">
.mu-item-text {
  max-height: 18px !important;
}
.demo-infinite-container {
  width: 100%;
  position: fixed;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>