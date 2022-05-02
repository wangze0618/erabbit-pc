<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-if="val.picture"
            :src="val.picture"
            :title="val.name"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
const spliter = '★'
// 得到一个路径字典对象
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      const valueArr = sku.specs.map((val) => val.valueName)
      // 可选值数组 子集
      const valueArrPowerSet = powerSet(valueArr)
      // 遍历子集，往pathMap插入数据
      valueArrPowerSet.forEach((arr) => {
        // 根据arr得到字符串的key，约定key是：['蓝色','美国'] ===> '蓝色★美国'
        const key = arr.join(spliter)
        // 给pathMap设置数据
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 获取已选中的值数组
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach((item) => {
    // 选中的按钮对象
    const seletedVal = item.values.find((val) => val.selected)
    arr.push(seletedVal ? seletedVal.name : undefined)
  })
  return arr
}
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 1. 约定每一个按钮的状态由本身的disabled数据来控制
  specs.forEach((item, i) => {
    const selectedValues = getSelectedValues(specs)
    item.values.forEach((val) => {
      // 2. 判断当前是否选中，是选中不用判断
      if (val.selected) return
      // 3. 拿当前的值按照顺序套入选中的值数组
      selectedValues[i] = val.name
      // 4. 剔除undefined数据，按照分隔符拼接key
      const key = selectedValues.filter((value) => value).join(spliter)
      // 5. 拿着key去路径字典中查找是否有数据，有可以点击，没有就禁用（true）
      val.disabled = !pathMap[key]
    })
  })
}
// 默认选中
const initDefaultSelected = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId)
  goods.specs.forEach((item, i) => {
    const val = item.values.find((val) => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
    skuId: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    // 根据skuId初始化选中
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
    }
    // ☆组件初始化：更新按钮禁用状态
    updateDisabledStatus(props.goods.specs, pathMap)

    const changeSku = (item, val) => {
      // 当按钮是禁用的阻止程序运行
      if (val.disabled) return
      // 如果不是禁用正常运行
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach((valItem) => {
          valItem.selected = false
        })
        val.selected = true
      }
      // ☆点击按钮时：更新按钮禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)

      const validSelectedValues = getSelectedValues(props.goods.specs).filter(
        (v) => v
      )
      if (validSelectedValues.length === props.goods.specs.length) {
        // 完整
        const skuIds = pathMap[validSelectedValues.join(spliter)]
        const sku = props.goods.skus.find((sku) => sku.id === skuIds[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          // 属性名：属性值 属性名1：属性值1 ... 这样的字符串
          specsText: sku.specs
            .reduce((p, c) => `${p} ${c.name}：${c.valueName}`, '')
            .trim(),
        })
      } else {
        emit('change', {})
      }
    }
    return { changeSku }
  },
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 10px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      line-height: 40px;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
