<template>
  <footer class="app-footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <div class="row">
          <div class="col-md-3 contact-item">
            <dl>
              <dt>客户服务</dt>
              <div class="item">
                <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
                <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
              </div>
            </dl>
          </div>
          <div class="col-md-3 contact-item">
            <dl>
              <dt>关注我们</dt>
              <div class="item">
                <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
                <dd><i class="iconfont icon-weibo"></i> 微博</dd>
              </div>
            </dl>
          </div>
          <div class="col-md-3 contact-item">
            <dl>
              <dt>下载APP</dt>
              <div class="item">
                <dd class="qrcode">
                  <img src="../assets/images/qrcode.jpg" />
                </dd>
                <dd class="download d-none d-lg-block">
                  <span>扫描二维码</span>
                  <span>立马下载APP</span>
                  <a href="javascript:;">下载页面</a>
                </dd>
              </div>
            </dl>
          </div>
          <div class="col-md-3 contact-item">
            <dl>
              <dt>服务热线</dt>
              <div class="item">
                <dd class="hotline">
                  <p>400-0000-000</p>
                  <small>周一至周日 8:00-18:00</small>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: center;
}
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 25px;
    }
  }
}

dl {
  height: 190px;
  text-align: center;
  padding: 0 72px;
  // border-right: 1px solid #f2f2f2 !important;
  color: #999;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    // border-right: none;
    padding-right: 0;
  }
}
dt {
  line-height: 1;
  font-size: 18px;
}
dd {
  margin: 36px 12px 0 0;
  float: left;
  width: 92px;
  height: 92px;
  padding-top: 10px;
  border: 1px solid #ededed;
  .iconfont {
    font-size: 36px;
    display: block;
    color: #666;
  }
  &:hover {
    .iconfont {
      color: @xtxColor;
    }
  }
  &:last-child {
    margin-right: 0;
    // border: none;
  }
}
.qrcode {
  width: 92px;
  height: 92px;
  padding: 7px;
  border: 1px solid #ededed;
}
.download {
  padding-top: 5px;
  font-size: 14px;
  width: auto;
  height: auto;
  border: none;
  span {
    display: block;
  }
  a {
    display: block;
    line-height: 1;
    padding: 10px 25px;
    margin-top: 5px;
    color: #fff;
    border-radius: 2px;
    background-color: @xtxColor;
  }
}
.hotline {
  padding-top: 20px;
  font-size: 22px;
  color: #666;
  width: auto;
  height: auto;
  border: none;
  small {
    display: block;
    font-size: 15px;
    color: #999;
  }
}

.extra {
  background-color: #333;
}
.slogan {
  height: 178px;
  line-height: 58px;
  padding: 0;
  align-items: center;
  border-bottom: 1px solid #434343;
  display: flex;
  justify-content: space-around;
  a {
    height: 58px;
    line-height: 58px;
    color: #fff;
    font-size: 28px;
    i {
      font-size: 50px;
      vertical-align: middle;
      margin-right: 10px;
      font-weight: 100;
    }
    span {
      vertical-align: middle;
      text-shadow: 0 0 1px #333;
    }
  }
}
.copyright {
  height: 170px;
  padding-top: 40px;
  text-align: center;
  color: #999;
  font-size: 15px;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    margin-bottom: 20px;
    font-size: 12px;
  }
  a {
    color: #999;
    line-height: 1;
    padding: 0 10px;
    border-right: 1px solid #999;
    &:last-child {
      border-right: none;
    }
  }
}
@media screen and (max-width: 767px) {
  .slogan {
    align-items: center;
    span {
      font-size: 16px;
    }
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        margin-right: 0;
      }
    }
  }
  .row {
    div {
      display: flex;
      justify-content: center;
    }
  }
}
</style>

<!-- <style scoped lang="less">
@media screen and (max-width: 767px) {
  .main-container {
    // padding: 50px 0 90px 25px;
    // flex-direction: column;
    // align-items: center;
    display: flex;
    dl {
      // padding: 0 !important;
      border: none !important;
    }
  }
}
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
  .contact {
    background: #fff;
    .main-container {
      padding: 50px 0 90px 25px;
      //   padding: 80px;
      display: flex;
      justify-content: center;
    }
    dl {
      max-width: 300px;
      flex: 1;
      height: 190px;
      text-align: center;
      // padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      &:first-child {
        // padding-left: 0;
      }
      &:last-child {
        border-right: none;
        // padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }
      &:hover {
        .iconfont {
          color: @xtxColor;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }
    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: @xtxColor;
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #333;
  }
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style> -->
