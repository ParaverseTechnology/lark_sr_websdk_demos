import { type Directive } from 'vue'

export const preventReClick: Directive = {
  // 防重复点击
 mounted (el: any, binding: any) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 1500)
      }
    })
  }
}
