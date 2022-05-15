<template>
  <XtxDialog title="添加收货地址" v-model:visible="dialogVisible">
    <!-- 表单 -->
    <template #default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                v-model="formData.receiver"
                class="input"
                placeholder="请输入收货人"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                v-model="formData.contact"
                class="input"
                type="tel"
                maxlength="11"
                placeholder="请输入手机号"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity
                :fullLocation="formData.fullLocation"
                @change="changeCity($event)"
                placeholder="请选择所在地区"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                v-model="formData.address"
                class="input"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                v-model="formData.postalCode"
                class="input"
                maxlength="6"
                placeholder="请输入邮政编码"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                v-model="formData.addressTags"
                class="input"
                placeholder="请输入地址标签，逗号分隔"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 底部按钮 -->
    <template #footer>
      <XtxButton
        @click="dialogVisible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</XtxButton
      >
      <XtxButton @click="submit()" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
import XtxDialog from '@/components/library/xtx-dialog.vue'
import XtxButton from '@/components/library/xtx-button.vue'
import XtxCity from '@/components/library/xtx-city.vue'
import { addAddress, getAddress } from '@/api/order.js'
import Message from '@/components/library/Message'
const dialogVisible = ref(false)
const emit = defineEmits(['on-success'])
// 定义表单数据对象
const formData = reactive({
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 1,
  fullLocation: '',
})
// 城市选中
const changeCity = (result) => {
  formData.provinceCode = result.provinceCode
  formData.cityCode = result.cityCode
  formData.countyCode = result.countyCode
  formData.fullLocation = result.fullLocation
}
// 打开函数
const open = async () => {
  dialogVisible.value = true
  for (const key in formData) {
    if (key === 'isDefault') {
      formData[key] = 1
    } else {
      formData[key] = ''
    }
  }
}

// 添加时候的提交操作（修改）
const submit = async () => {
  try {
    const { result } = await addAddress(formData)
    Message({ type: 'success', text: '添加收货地址成功' })
    dialogVisible.value = false
    emit('on-success', formData)
  } catch (error) {}
}

defineExpose({
  open,
})
</script>

<style scoped lang="less">
.address-edit {
  .xtx-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .xtx-form-item {
      display: flex;
      height: 50px;
      width: 400px;
      align-items: center;
      margin-bottom: 10px;
      input {
        flex: 1;
        width: 320px;
        outline: none;
        border: 1px solid #e4e4e4;
        height: 50px;
        padding-left: 5px;
        &::placeholder {
          color: #ccc;
        }
        &:focus {
          border: 1px solid @xtxColor;
        }
      }
      .label {
        text-align: end;
        width: 80px;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
// .xtx-dialog {
//   :deep(.wrapper) {
//     width: 780px;
//     .body {
//       font-size: 14px;
//     }
//   }
// }
// .xtx-form {
//   padding: 0;
//   input {
//     outline: none;
//     &::placeholder {
//       color: #ccc;
//     }
//   }
// }
:deep(.xtx-city) {
  width: 320px;
  height: 50px;
  .select {
    border: 1px solid #e4e4e4;
    height: 50px !important;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #888 !important;
      height: 100%;
    }
    i {
      color: #888;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
