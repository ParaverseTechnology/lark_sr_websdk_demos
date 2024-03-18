<template>
  <ContentAlert :alertPositionStyle="alertPositionStyle">
    <template v-slot:close>
      <div @click="onCancel">
          <i class="el-icon-close"></i>
      </div>
    </template>
    <template v-slot:content>
      <div v-for="(item, index) in helpList" class="help-row" :key="item.title">
        <div class="help-row-title" @click="caretFn(index)">
          <p>{{item.title}}</p>
          <i :ref="'caret'+index" class="el-icon-caret-bottom"></i>
        </div>
        <div class="help-row-content" :ref="'content'+index">
          {{item.content}}
        </div>
      </div>
    </template>
  </ContentAlert>
</template>
<script>
import { mapState } from 'vuex';
import ContentAlert from '../custom_content_alert/custom_content_alert'
import { mapMutations } from 'vuex'
export default {
  components: {
    ContentAlert
  },
  computed: {
    helpList() {
      let list = [
        {title: '卡顿解决办法',content: '当前网络质量不稳定，请尝试更换网络环境'},
        {title: '应用无法启动',content: '当前进入应用的用户数较多，等待一段时间后仍无法进入，可尝试点击重新启动按钮再次进入应用；如仍旧无法进入，请尝试刷新网页 url 重新连接应用'}
      ]
      if(this.isMobile) {
        list.push({title: '如何收缩/显示控制球',content: '点击【解锁】进行控制球菜单解锁，关闭控制球菜单面板2秒后控制球收缩到屏幕侧边，点击控制球，控制球弹出显示；如需持续显示控制球，点击【锁定】进行控制球菜单锁定，控制球将不会收缩至屏幕侧边'})
      }
      return list
    },
    
    ...mapState({
      isMobile: state => state.isMobile
    }),
  },
  data () {
    return {
      active: '',
      alertPositionStyle: {
          top: '75px',
          right: '20px',
          position: 'absolute'
      }
    }
  },
  methods: {
    caretFn(index) {
      if(this.active === index) {
        this.active = '';
        this.$refs['caret'+index][0].style.transform = 'rotate(0deg)';
        this.$refs['content'+index][0].style['max-height'] = '0px';
        this.$refs['content'+index][0].style['margin-bottom'] = '0px';
      } else {
        this.active = index;
        this.$refs['caret'+index][0].style.transform = 'rotate(-180deg)';
        this.$refs['content'+index][0].style['max-height'] = '28.3rem';
        this.$refs['content'+index][0].style['margin-bottom'] = '20px';
      }
      
      this.$refs['caret'+index][0].style.transition = 'all 0.1s';
      this.$refs['content'+index][0].style.transition = 'all 0.3s';
    },
    onCancel() {
      this.setIsShowHelpAlert(false);
      this.setCustomContentAlertTitle('');
    },
    ...mapMutations({
      setIsShowHelpAlert: 'modalHelp/setIsShowHelpAlert',
      setCustomContentAlertTitle: 'customContentAlert/setCustomContentAlertTitle'
    }),
  }
}
</script>
<style lang='scss' scoped>
.help-row {
  border-bottom: 1px solid var(--webclient-dialog-divider);
  cursor: pointer;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 5px 1.8rem 0;
    box-sizing: border-box;
    >i {
      cursor: pointer;
      font-size: 2rem;
      transform: rotate(0deg);
    }
    >i.active {
      transform: rotate(180deg);
      transition: all 0.3s;
    }
    >p {
      margin: 0;
    }
  }
  &-content {
    text-align: left;
    margin-bottom: 0px;
    max-height: 0px;
    overflow: auto;
  }
}
</style>
