<script>
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
  setup(props, { emit }) {},
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

    const tabClick = (nums) => {
      console.log(nums)
    }
    // 选项卡标题
    const nav = (
      <nav>
        {dynamicItems.map((item, i) => {
          return (
            <a
              class={{ active: item.props.name === this.active }}
              onClick={tabClick(1)}
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
</script>

<style scoped lang="less">
.active {
  color: red;
}
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
