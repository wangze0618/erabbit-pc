<template>
  <div class="xtx-city" ref="target">
    <div
      class="select"
      @click="visible ? close() : open()"
      :class="{ active: visible }"
    >
      <span v-if="!fullLocation" class="placeholder">{{ placeholder }}</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <XtxLoading v-if="loading"></XtxLoading>
      <template v-else>
        <span
          class="ellipsis"
          @click="changeItem(item)"
          v-for="item in currentList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>
<script setup>
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { ref, computed, reactive } from 'vue'
import XtxLoading from './xtx-loading.vue'
const props = defineProps({
  fullLocation: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择配送地址',
  },
})
const emit = defineEmits(['change'])
// 显示隐藏数据
const visible = ref(false)
// 所有省市区的数据
const allCityData = ref([])
// 是否加载中
const loading = ref(false)

// 打开函数
const open = async () => {
  visible.value = true
  for (const key in changeResult) {
    changeResult[key] = ''
  }
  allCityData.value = await getCityData()
  loading.value = false
}
// 关闭函数
const close = () => {
  visible.value = false
}

// 点击外面的区域隐藏数据
const target = ref(null)
onClickOutside(target, () => {
  close()
})

// 记录选择的省市区数据
const changeResult = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityCode: '',
  countyCode: '',
  countyName: '',
  fullLocation: '',
})

// 计算属性 获取当前显示的地区数组
const currentList = computed(() => {
  // 默认 省一级
  let list = allCityData.value
  // 市一级
  if (changeResult.provinceCode && changeResult.provinceName) {
    list = list.find((p) => p.code === changeResult.provinceCode).areaList
  }
  // 县、区一级
  if (changeResult.cityCode && changeResult.cityName) {
    list = list.find((p) => p.code === changeResult.cityCode).areaList
  }
  return list
})

// 点击按钮记录数据
const changeItem = (item) => {
  // 省
  if (item.level == 0) {
    changeResult.provinceCode = item.code
    changeResult.provinceName = item.name
  }
  // 市
  if (item.level == 1) {
    changeResult.cityCode = item.code
    changeResult.cityName = item.name
  }
  // 地区
  if (item.level == 2) {
    changeResult.countyCode = item.code
    changeResult.countyName = item.name

    // 最后一级（选完了）
    close()
    changeResult.fullLocation =
      changeResult.provinceName +
      ' ' +
      changeResult.cityName +
      ' ' +
      changeResult.countyName
    emit('change', changeResult)
  }
}

// 获取省市区数据函数
const getCityData = () => {
  loading.value = true
  const url =
    'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'

  return new Promise(async (resolve, reject) => {
    // 有缓存
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      // 无缓存
      const { data } = await axios({ method: 'get', url })
      // 把数据缓存到 window对象上
      window.cityData = data
      resolve(data)
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #d4d4d4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #000;
      background-color: unset;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
