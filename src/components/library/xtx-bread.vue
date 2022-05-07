<script>
import { h, createVNode } from 'vue'
export default {
  render() {
    const items = this.$slots.default()
    const dymanicItems = []

    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < items.length - 1) {
        dymanicItems.push(
          createVNode('i', { class: 'iconfont icon-angle-right' })
        )
      }
    })
    return createVNode('div', { class: 'xtx-bread' }, dymanicItems)
  },
}
</script>
<style lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>
