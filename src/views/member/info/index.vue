<template>
  <div class="member-info" v-if="info">
    <div class="container main">
      <form>
        <!-- avatar -->
        <div class="pt-4 mb-3 mx-auto avatar">
          <img
            class="avatar-img"
            :src="info.avatar"
            type="text"
            id="nickname"
          />
        </div>
        <!-- nickname -->
        <div class="mb-3">
          <label for="nickname" class="form-label">昵称</label>
          <input
            type="text"
            class="form-control"
            id="nickname"
            v-model="info.nickname"
          />
        </div>
        <!-- account -->
        <div class="mb-3">
          <label for="account" class="form-label">用户名</label>
          <input
            type="text"
            class="form-control"
            id="account"
            v-model="info.account"
          />
        </div>
        <!-- gender -->
        <div class="mb-3">
          <label for="gender" class="form-label">性别</label>
          <input
            type="text"
            class="form-control"
            id="gender"
            v-model="info.gender"
          />
        </div>
        <!-- birthday -->
        <div class="mb-3">
          <label for="birthday" class="form-label">生日</label>
          <input
            type="text"
            class="form-control"
            id="birthday"
            v-model="info.birthday"
          />
        </div>
        <!-- fullLocation -->
        <div class="mb-3">
          <label for="fullLocation" class="form-label">地址</label>
          <input
            type="text"
            class="form-control"
            id="fullLocation"
            v-model="info.fullLocation"
          />
        </div>
        <!-- profession -->
        <div class="mb-5">
          <label for="profession" class="form-label">职业</label>
          <input
            type="text"
            class="form-control"
            id="profession"
            v-model="info.profession"
          />
        </div>
        <!-- submit/reset -->
        <div class="text-center">
          <button @click="changeInfo" class="me-5 btn btn-primary">提交</button>
          <button class="btn btn-danger">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { userInfo, changeUserInfo } from '@/api/user'
import { onMounted, reactive, ref } from 'vue'
const info = ref(null)
onMounted(() => {
  getInfo()
})
// 获取信息
const getInfo = async () => {
  const { result } = await userInfo()
  info.value = result
}
// 修改信息
const changeInfo = async () => {
  const { result } = await changeUserInfo({
    nickname: info.nickname,
    gender: info.gender,
    birthday: info.birthday,
    profession: info.profession,
  })
  console.log(result)
}
</script>

<style scoped lang="less">
.avatar {
  display: flex;
  justify-content: center;
}
.avatar-img {
  text-align: center;
  max-width: calc(2vw + 70px);
}
.member-info {
  background-color: rgb(255, 255, 255);
  height: 100%;
}
.form-control,
.form-check-input {
  border: 1px solid #ced4da;
}
.form-control {
  padding: 0.375rem 0.75rem;
  height: 33.5px !important;
}
</style>
