<template>
  <XtxDialog title="添加收货地址" v-model:visible="dialogVisible">
    <!-- 表单 -->
    <template #default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input class="input" placeholder="请输入收货人" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input class="input" placeholder="请输入手机号" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity placeholder="请选择所在地区" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input class="input" placeholder="请输入详细地址" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input class="input" placeholder="请输入邮政编码" />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input class="input" placeholder="请输入地址标签，逗号分隔" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 底部按钮 -->
    <template #footer>
      <XtxButton type="gray" style="margin-right: 20px">取消</XtxButton>
      <XtxButton type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script setup>
import { ref } from 'vue'
import XtxDialog from '@/components/library/xtx-dialog.vue'
import XtxButton from '@/components/library/xtx-button.vue'
import XtxCity from '@/components/library/xtx-city.vue'
const dialogVisible = ref(false)

// 打开函数
const open = () => {
  dialogVisible.value = true
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
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
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
