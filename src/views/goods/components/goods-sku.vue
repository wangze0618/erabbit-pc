<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            v-if="val.picture"
            :src="val.picture"
            :alt="val.name"
            :title="val.name"
            @click="changeSku(item, val)"
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

<script setup>
import powerset from '@/vender/power-set'

// 定义props
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({}),
  },
  skuId: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['change'])
const spliter = '★'

const initSelectedStatus = (goods, skuId) => {
  // 找出sku的信息
  // 遍历每一个按钮 按钮的值和sku记录的值相同
  const sku = goods.skus.find((sku) => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName
      spec.values.forEach((val) => {
        val.selected = val.name === value
      })
    })
  }
}
// 得到一个路径字典对象
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      const valueArr = sku.specs.map((val) => val.valueName)
      const valuePowerArr = powerset(valueArr)
      valuePowerArr.forEach((arr) => {
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
const pathMap = getPathMap(props.goods.skus)
const getSelectedValues = (specs) => {
  const arr = []
  specs.forEach((item) => {
    const selectedVal = item.values.find((val) => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
initSelectedStatus(props.goods, props.skuId)
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedValues(specs)
    spec.values.forEach((val) => {
      // 已经选中的按钮不用判断
      if (val.name === selectedArr[i]) return false
      // 未选中的替换对应的值
      selectedArr[i] = val.name
      // 过滤无效值得到key
      const key = selectedArr.filter((v) => v).join(spliter)
      // 设置禁用状态
      val.disabled = !pathMap[key]
    })
  })
}
updateDisabledStatus(props.goods.specs, pathMap)
// 实现取消/选中功能
const changeSku = (item, val) => {
  if (val.disabled) return
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((val) => {
      val.selected = false
    })
    val.selected = true
  }
}
// 触发change事件将sku数据传递出去
const selectedArr = getSelectedValues(props.goods.specs).filter((v) => v)
if (selectedArr.length === props.goods.specs.length) {
  const skuIds = pathMap[selectedArr.join(spliter)]
  const sku = props.goods.skus.find((sku) => sku.id === skuIds[0])
  // 传递
  emit('change', {
    skuId: sku.id,
    price: sku.price,
    oldPrice: sku.oldPrice,
    inventory: sku.inventory,
    specsText: sku.specs
      .reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '')
      .replace(' ', ''),
  })
} else {
  emit('change', {})
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin: 3px;
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
  max-width: 500px;
  padding-left: 10px;
  padding-top: 20px;
  background-color: #f5f5f5;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
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
