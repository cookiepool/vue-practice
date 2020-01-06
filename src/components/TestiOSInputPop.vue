<template>
  <div v-if="isShow" class="pop-wraper flex_all_center" @touchmove.prevent>
    <div class="pop-dialog">
      <div class="icon-wraper">
        <img
          class="icon"
          src="https://static.cattryapp.com/12static/new/img/lanmao__icon.png"
        />
      </div>
      <p class="bind-title">手机号登录</p>
      <!-- @blur="scrollToTop" -->
      <div class="bind-tel-wrap">
        <input
          v-model="phone"
          @blur="scrollToTop"
          type="number"
          class="bind-tel"
          placeholder="请输入手机号码"
        />
      </div>

      <div class="bind-code-wrap flex_btn_center">
        <input
          v-model="code"
          @blur="scrollToTop"
          type="number"
          class="bind-tel bind-code"
          placeholder="请输入验证码"
        />

        <span
          v-if="isSendCode === false"
          @click="sendCode"
          class="getcode-btn flex_all_center"
          >{{ "获取验证码" }}</span
        >
        <span v-if="isSendCode === true" class="getcode-btn flex_all_center">{{
          leftTime
        }}</span>
      </div>

      <div @click="submitInfo" class="login-btn flex_all_center">立即登录</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "bind-phone",
  props: {
    popShow: Boolean
  },
  data() {
    return {
      // isShow: this.popShow, // 用这种方式监听不到变化，必须用下面的计算属性
      isSendCode: false,
      leftTime: 60,
      phone: "",
      code: ""
    };
  },
  computed: {
    isShow() {
      return this.popShow;
    }
  },
  methods: {
    // ios13手机的键盘会把页面顶上去，但是关闭时不复原位置，这个用来复原原位置。
    scrollToTop() {
      // let currentPosition;
      // let speed=1;//页面滚动距离
      // currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
      // currentPosition-=speed; 
      // window.scrollTo(0,currentPosition);//页面向上滚动
      // currentPosition+=speed; //speed变量
      // window.scrollTo(0,currentPosition);//页面向下滚动
      window.scroll(0, 0)
    },
    submitInfo() {
      if (this.phone == "") {
        Toast("手机号不能为空");
        return;
      }
      if (this.phone.length != 11) {
        Toast("请输入正确的手机号");
        return;
      }
      if (this.code == "") {
        Toast("验证码不能为空");
        return;
      }

      let params = {
        phone: this.phone,
        code: this.code
      };
      api.newUserBindPhone(params).then(res => {
        if (res.data.status == true) {
          this.$MessageBox.alert(res.data.msg).then(() => {
            window.location.reload();
          })
        } else {
          Toast(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    sendCode() {
      if (this.isSendCode === true) {
        return;
      }

      let phone = this.phone;
      if (phone == "") {
        Toast("手机号不能为空");
        return;
      }
      if (phone.length != 11) {
        Toast("请输入正确的手机号");
        return;
      }
      api.sendPhoneCode({ params: { phone: phone, checkUserPhone: 0 } }).then(res => {
        if (res.data.status == true) {
          this.isSendCode = true;
          this.timeCount();
          Toast(res.data.msg);
        } else {
          Toast(res.data.msg);
        }
      });
    },
    timeCount() {
      let timer = setInterval(() => {
        this.leftTime--;
        if (this.leftTime <= 0) {
          this.leftTime = 60;
          this.isSendCode = false;
          clearInterval(timer);
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.pop-wraper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop-dialog {
  width: 300px;
  background-color: #fff;
  border-radius: 0.571429rem;
  padding: 2.285714rem 1.714286rem;
  box-sizing: border-box;
}
.icon-wraper {
  text-align: center;
}
.icon-wraper .icon {
  width: 6.142857rem;
}
.bind-title {
  font-size: 1.285714rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 2rem;
}
.bind-tel-wrap {
  padding: 4px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 16px;
  margin-bottom: 20px;
}
.bind-tel {
  width: 100%;
  box-sizing: border-box;
  appearance: none;
  outline: 0;
  border: 0;
  font-size: 1.142857rem;
}
.bind-code-wrap {
  padding: 4px 0;
  border-bottom: 1px solid #e0e0e0;
}
.bind-code {
  width: 60%;
}
.getcode-btn {
  width: 6.857143rem;
  height: 2.285714rem;
  border-radius: 1.142857rem;
  border: 1px solid rgba(255, 99, 83, 1);
  font-size: 1rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 99, 83, 1);
  line-height: 1.428571rem;
}
.login-btn {
  width: 100%;
  height: 3.214286rem;
  background-color: #ff6353;
  border-radius: 1.571429rem;
  font-size: 1.142857rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 1.571429rem;
  margin-top: 3.214286rem;
}
</style>
