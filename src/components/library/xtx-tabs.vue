<!-- <script>
import { ref } from 'vue'

// 在babel的帮助下使用jsx语法
export default {
  name: 'XtxTabs',
  props: {
    active: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, { emit }) {
    const activeName = ref(props.active)
    // console.log(activeName.value)
    // emit()
    return { activeName }
  },
  render() {
    const panelItems = this.$slots.default()
    const dynamicItems = []

    panelItems.forEach((item, i) => {
      if (item.type.name === 'xtx-tabs-panel') {
        dynamicItems.push(item)
      } else {
        item.children.forEach((item) => {
          dynamicItems.push(item)
        })
      }
    })

    const tabClick = () => {
      console.log(1)
    }
    // 选项卡标题
    const nav = (
      <nav>
        {dynamicItems.map((item, i) => {
          return (
            <a
              class={{ active: item.props.name === this.activeName }}
              onClick={tabClick}
              href="javascript:;"
            >
              {item.props.label}
            </a>
          )
        })}
      </nav>
    )
    // 选项卡内容
    const content = (
      <div>
        {dynamicItems.map((item, i) => {
          return <div href="javascript:;">{item}</div>
        })}
      </div>
    )
    return <div class="xtx-tabs">{[nav, content]}</div>
  },
}
</script> -->
<template>
  <div class="xtx-tabs">
    <div class="tab-title">
      <a
        @click="tabClick(title.name, index)"
        href="javascript:;"
        :class="{ active: active == title.name }"
        v-for="(title, index) in titleList"
        >{{ title.label }}</a
      >
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
export default {
  props: {
    active: {
      type: [String, Number, Object],
      default: '',
    },
  },
  setup(props, { slots, emit }) {
    const List = slots.default()
    const dynamicList = []

    const activeName = ref(props.active)
    provide('activeName', activeName)
    // 动态数组
    List.forEach((item, i) => {
      if (item.type.name === 'xtx-tabs-panel') {
        dynamicList.push(item)
      } else {
        item.children.forEach((item) => {
          dynamicList.push(item)
        })
      }
    })

    // 标题数组
    const titleList = []
    dynamicList.map((item, i) => {
      titleList.push({ label: item.props.label, name: item.props.name })
    })

    // 改变激活tab
    const tabClick = (name, index) => {
      activeName.value = name
      emit('update:active', { index, name })
      emit('tabClick', { index, name })
    }

    return { titleList, tabClick, activeName }
  },
}
</script>
<style scoped lang="less">
.active {
  background: #fff;
  border-top: 2px solid @xtxColor;
  line-height: 46px !important;
}
.xtx-tabs {
  background: #fff;
  .tab-title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    a {
      line-height: 50px;
      text-align: center;
      width: calc(5vw + 40px);
      height: 50px;
      border-right: 1px solid #f5f5f5;
      &:hover {
        color: unset;
      }
    }
  }
}
</style>
