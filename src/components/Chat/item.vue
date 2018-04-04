<template>
  <div class="item">
    <div v-if='showTime' class="time">{{_time2time(time)}}</div>
    <mu-flexbox align='flex-start'>
      <mu-flexbox-item>
        <mu-avatar v-if='!self' :src="avatar" class="avatar" />
      </mu-flexbox-item>
      <mu-flexbox-item grow='7' >
        <mu-raised-button :label="content" class="chatItem" :class="[self?'right':'left']" />
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-avatar v-if='self' :src="avatar" class="avatar" />
      </mu-flexbox-item>
    </mu-flexbox>
    </div>
</template>
<script>
  import 'common/js/ning/itool.js'

  export default {
    name: 'chatItem',
    props: {
      avatar: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      time: {
        type: Number,
        default: new Date().getTime()
      },
      self: {
        type: Boolean,
        default: false
      },
      showTime: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      _time2time(time) {
        return new Date(time).toFormatString('yyyy-MM-dd hh:mm:ss')
      }
    }
  }

</script>
<style scoped lang="css">
  .item {
    padding: 1rem .5rem;
  }
  
  .chatItem {
    padding: 1rem 0;
    border-radius: 8px;
    -webkit-border-radius: 10px;
    position: relative;
    /*overflow: visible;*/
    height: auto;
    line-height: 2rem;
    text-align: left;
  }
  .left {
    float: left
  }
  .right {
    float: right
  }
 
  /*.chatItem:after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    border: solid 8px;
    font-size: 0;
    box-shadow: inherit;
  }
  .chatItem.left:after{
    left: -16px;
    border-color: transparent ;
  }*/
  
  .avatar {
    
  }
  
  .time {
    text-align: center;
    line-height: 4rem;
  }

</style>
