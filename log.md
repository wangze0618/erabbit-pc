1. 首页主体- 组件数据懒加载
我们可以使用 @vueuse/core 中的 useIntersectionObserver 来实现监听进入可视区域行为，但是必须配合vue3.0的组合API的方式才能实现。
大致步骤：
* 理解 useIntersectionObserver 的使用，各个参数的含义
* 改造 home-new 组件成为数据懒加载，掌握 useIntersectionObserver 函数的用法
* 封装 useLazyData 函数，作为数据懒加载公用函数
* 把 home-new 和 home-hot 改造成懒加载方式
2. 购物车模块 - 处理价格小数点的问题
解决办法：例如：

```js
Math.round(goods.nowPrice * 100 * goods.count) / 100
```

## 提取 一个URL地址字符串中的 请求参数

```js
import qs from 'qs'
const FullUrlStr = 'https://apipc-xiaotuxian-front.itheima.net/member/collect?page=1&pageSize=4&collectType=1';
const urlStr = FullUrlStr.split('?')[1];
const params = qs.parse(urlStr);
// {page: '1', pageSize: '4', collectType: '1'}
```
