<template>
  <div class="login">
    <div class="login__wrap">
      <h3 class="login__title">Login</h3>
      <form class="login__form">
        <div class="login__form__field">
          <input
            class="login__form__field__input"
            required="required"
            name="username"
            v-model="form.username"
          />
          <label class="login__form__field__label">Username</label>
        </div>
        <div class="login__form__field">
          <input
            class="login__form__field__input"
            type="password"
            name="password"
            v-model="form.pwd"
            required="required"
          />
          <label class="login__form__field__label">Password</label>
        </div>
        <div class="login__form__footer">
          <button
            class="login__form__submit"
            type="button"
            @click="this.onSubmit"
          >
            Login
          </button>
        </div>
      </form>
      <p class="login__footer">
        Don't have account?<a class="link" href="logup"> Sign up</a>
      </p>
    </div>
  </div>
</template>

<script>
import { login } from '../apis';
export default {
  data: function() {
    return {
      form: {
        pwd: localStorage.getItem('pwd') || null,
        username: 'nicaicaikan',
      },
    };
  },
  methods: {
    onSubmit() {
      login(this.form.pwd).then(e => {
        if (e) {
          this.$router.push('fileChose');
        } else {
          window.confirm('密码错误');
        }
      });
    },
  },
};
</script>

<style lang="scss">
$font-color: #303133;
$font-color--dark: #909399;
$linear-left: #209cff;
$linear-right: #68e0cf;
$loginBgc: rgba(#68e0cf, 0.65);
$loginBgcShadow: 0 15px 25px rgba(#ec8c69, 0.65);

$linear-btn-left: #764ba2;
$linear-btn-right: #667eea;

$font-size--md: 16px;
$font-size--sm: 12px;
$font-size--lg: 20px;

$link--color: #4b5cc4;

$border-color: #e4e7ed;

.login {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  color: $font-color;
  font-size: $font-size--md;
  height: 100%;
  // background-image: linear-gradient(to right, #a18cd1, #fbc2eb);
  background: linear-gradient($linear-left, $linear-right);
  &__wrap {
    width: 75%;
    max-width: 400px;
    min-width: 200px;
    position: relative;
    background-color: $loginBgc;
    box-shadow: $loginBgcShadow;
    padding: 30px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__form {
    &__field {
      position: relative;
      margin-bottom: 40px;
      &__label {
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.3s;
        input:focus + &,
        input:valid + & {
          font-size: $font-size--sm;
          top: -20px;

          color: $font-color--dark;
        }
      }
      &__input {
        color: $font-color;
        width: 100%;
        border: none;
        outline: none;
        padding: 5px 0px;
        background-color: transparent;
        border-bottom: 1px solid $border-color;
      }
    }
    &__submit {
      //消除button的默认样式
      margin: 0;
      padding: 0;
      border: 1px solid transparent; //自定义边框
      outline: none; //消除默认点击蓝色边框效果
      font-size: inherit;
      color: #fff;

      border-radius: 4px;
      width: 100%;
      padding: 10px;
      cursor: pointer;
      background-color: $linear-btn-left;
      &:hover {
        background-image: linear-gradient(
          to right,
          $linear-btn-left,
          $linear-btn-right
        );
      }
    }
  }

  &__title {
    text-align: center;
    font-size: $font-size--lg;
    margin: 50px auto;
    margin-top: 35px;
  }
  &__footer {
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
}
.link {
  color: $link--color;
  text-decoration: none;
}
</style>
