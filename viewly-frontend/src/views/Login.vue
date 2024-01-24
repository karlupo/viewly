<template>
  <div class="login-wrapper">
    <ErrorNotification :Text="errorMessage" v-if="errorMessage != ''" />
    <form>
      <h1>LOGIN</h1>
      <div class="input-field">
        <div class="inputs-wrapper">
          <span class="material-symbols-outlined"> person </span>
          <input type="text" id="username" placeholder="Enter your username or email" v-model="username" />
        </div>
      </div>
      <div class="input-field">
        <div class="inputs-wrapper">
          <span class="material-symbols-outlined"> key </span><input :type="showPassword ? 'text' : 'password'"
            id="password" placeholder="Enter your password" v-model="password" />
          <span id="showHidePassword" class="material-symbols-outlined" @click="togglePassword()"> {{ showPassword ?
            'visibility_off' : 'visibility' }} </span>
        </div>
      </div>
      <div id="remember-wrapper">
        <input type="checkbox" id="remember-login">
        <label for="remember-login">Remember me for 30days</label>
      </div>

      <div id="register-div">
        <p>Dont have an account? <router-link id="router-link" :to="{ name: 'register' }">Register</router-link></p>
      </div>

      <input type="button" value="Login" @click="submitLogin()" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { sha256 } from 'js-sha256';
import router from '@/router';
import ErrorNotification from '@/components/Notifications/ErrorNotification.vue';
import app from '@/App.vue';
import { inject } from 'vue'

export default {
  name: "Login",
  components: {
    ErrorNotification
  },
  setup() {
    let showPassword = ref(false)
    let username = ref('')
    let password = ref('')
    let disabled = ref(false)
    let errorMessage = ref('')

    let togglePassword = () => {
      showPassword.value = !showPassword.value
      console.log(showPassword.value)
    }

    let submitLogin = () => {
      fetch('http://213.229.25.14:3080/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: sha256(password.value),
          keepLoggedIn: document.getElementById('remember-login').checked
        })
      }).then(res => res.json())
        .then(data => {
          if (!data.error) {
            localStorage.setItem('token', data.token)
            setTimeout(() => {
              window.location.href = '/'
            }, 1000);
          } else {
            errorMessage.value = data.error
            setTimeout(() => {
              errorMessage.value = ""
            }, 6000);
          }
        })
    }

    return {
      showPassword,
      togglePassword,
      submitLogin,
      username,
      password,
      disabled,
      errorMessage
    }
  }
};
</script>

<style scoped>
*:not(input) {
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}

#register-div {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 77%;
  margin-top: 20px;
}

#register-div p {
  font-size: 15px;
}

#router-link {
  color: black;
}

#remember-wrapper {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 15px;
  width: 70%;
}

#remember-wrapper label {
  margin-left: 10px;
}

#remember-wrapper input {
  width: 17.5px;
  margin: 0;
}

h1 {
  position: absolute;
  top: 0;
  padding: 1rem 0 0 0;
  margin: 0;
  color: black;
}

#showHidePassword {
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.3s ease-in-out;
}


#showHidePassword:hover {
  color: rgba(117, 195, 204, 255);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;

  background-color: rgba(240, 244, 246);
  width: 27.5%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 10vh;
  border-radius: 1.35rem;

  -webkit-box-shadow: 0px 0px 50px 13px rgba(0, 0, 0, 0.589);
  -moz-box-shadow: 0px 0px 50px 13px rgba(0, 0, 0, 0.589);
  box-shadow: 0px 0px 50px 13px rgba(0, 0, 0, 0.589);
}

.input-field {
  width: 70%;
  margin-bottom: 40px;
}

.inputs-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.input-field::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: #00000033;
}

span {
  font-size: 2rem;
  margin-right: 10px;
  color: rgba(28, 28, 28, 255);
}

input {
  background-color: transparent;
  border: none;
  outline: none;
  color: rgba(28, 28, 28, 255);
  font-size: 0.9rem;
  font-weight: 300;
  padding: 10px 0;
  width: 100%;
}

input[type="button"] {
  position: absolute;
  bottom: 2rem;
  width: 6rem;
  background-color: rgba(28, 28, 28, 255);
  color: rgba(240, 244, 246);
  border-radius: 0.8rem;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid rgba(28, 28, 28, 255);
}

input[type="button"]:hover {
  background-color: rgba(240, 244, 246);
  color: rgba(28, 28, 28, 255);
  border: 1px solid rgba(28, 28, 28, 255);
}
</style>
