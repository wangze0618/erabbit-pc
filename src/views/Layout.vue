<!-- 头、底 -->
<template>
    <div class="container">
        <!-- 顶部通栏 -->
        <nav>顶部通栏</nav>
        <!-- 头部组件 -->
        <header>头部组件</header>
        <!-- 内容容器 -->
        <div class="main">
            <!-- 二级路由 -->
            <router-view></router-view>
        </div>
        <!-- 底部组件 -->
        <footer>底部组件</footer>
    </div>
</template>
 
<script>
import { ref } from 'vue';
export default {
    name: 'Layout',
    setup() {

        return {}
    }
}
</script>
 
<style scoped lang = "less">
</style>