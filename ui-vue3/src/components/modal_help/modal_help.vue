<template>
  <ContentAlert :alertPositionStyle="alertPositionStyle">
    <template v-slot:close>
      <div @click="onCancel">
        <el-icon :size="'1.8rem'"><Close /></el-icon>
      </div>
    </template>
    <template v-slot:content>
      <div :ref="falist" v-for="(item, index) in helpList" class="help-row" :key="item.title">
        <div class="help-row-title" @click="caretFn(index)">
          <p>{{item.title}}</p>
          <div :ref="el => getHelpRef(el, index)">
            <el-icon><CaretBottom /></el-icon>
          </div>
        </div>
        <div class="help-row-content" :ref="el => getContentRef(el, index)">
          {{item.content}}
        </div>
      </div>
    </template>
  </ContentAlert>
</template>
<script setup>
import { useCommStore } from '@/stores/comm.js';
import { useModalHelpStore } from '@/stores/modal_help.js';
import { useCustomContentAlertStore } from '@/stores/custom_content_alert.js';
import ContentAlert from '../custom_content_alert/custom_content_alert.vue';

const commStore = useCommStore();
const modalHelpStore = useModalHelpStore();
const customContentAlertStore = useCustomContentAlertStore();

const falist = ref(null);

const helpResList = ref([]);

const ui = computed(() => {
  return commStore.ui;
});

const helpRefList = ref([]);
const getHelpRef = (el, index) => {
  if (el) {
    helpRefList.value[index] = el; 
  }
}

const contentRefList = ref([]);
const getContentRef = (el, index) => {
  if (el) {
    contentRefList.value[index] = el; 
  }
}

const helpList = computed(() => {
  let list = [
     
      {title: ui.value.helpTitle1,content: ui.value.helpContent1},
      {title: ui.value.helpTitle2,content: ui.value.helpContent2}
    ]
    if(commStore.isMobile) {
      list.push( {title: ui.value.helpTitle4,content: ui.value.helpContent4})
    }
    return list
});

const active = ref('');
const alertPositionStyle = reactive({
    top: '75px',
    right: '20px',
    position: 'absolute'
});


const caretFn = (index) => {
  if(active.value === index) {
    active.value = '';
   
    helpRefList.value[index].style.transform = 'rotate(0deg)';
    contentRefList.value[index].style['max-height'] = '0px';
    contentRefList.value[index].style['margin-bottom'] = '0px';
    
  } else {
    active.value = index;
    
    helpRefList.value[index].style.transform = 'rotate(-180deg)';
    contentRefList.value[index].style['max-height'] = '28.3rem';
    contentRefList.value[index].style['margin'] = '0.5rem 0';
  }

  helpRefList.value[index].style.transition = 'all 0.1s';
  contentRefList.value[index].style.transition = 'all 0.3s';
};
const onCancel = () => {
  modalHelpStore.setIsShowHelpAlert(false);
  customContentAlertStore.setCustomContentAlertTitle('');
};

onMounted(async () => {

})

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
