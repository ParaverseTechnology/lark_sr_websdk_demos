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
        {title: this.ui.helpTitle1,content: this.ui.helpContent1},
        {title: this.ui.helpTitle2,content: this.ui.helpContent2}
      ]
      if(this.isMobile) {
        list.push( {title: this.ui.helpTitle4,content: this.ui.helpContent4})
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
