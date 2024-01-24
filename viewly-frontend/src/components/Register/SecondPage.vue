<template>
  <div class="firstpage-wrapper">
      <form>
      <h1>Register</h1>
      <div class="input-field">
        <div class="inputs-wrapper">
          <span class="material-symbols-outlined">person</span><input v-model="username" type="text" id="username" placeholder="Enter your username" />
        </div>
      </div>
      <div class="input-field">
        <div class="inputs-wrapper">
          <span class="material-symbols-outlined"> alternate_email </span><input v-model="email" type="email" id="email"
            placeholder="Enter your email" />
        </div>
      </div>
      <div class="input-field">
        <div class="inputs-wrapper">
          <span class="material-symbols-outlined"> key </span><input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
            placeholder="Enter your password" />
          <span id="showHidePassword" class="material-symbols-outlined" @click="togglePassword()"> {{ showPassword ? 'visibility_off' : 'visibility'}} </span>
        </div>
      </div>
      <div id="remember-wrapper">
        <input type="checkbox" id="remember-login">
        <label for="remember-login">Remember me for 30days</label>
      </div>
      <span id="button" class="material-symbols-outlined" @click="requestNextPage()">arrow_forward</span>
    </form>
  </div>
</template>

<script>
    import { ref } from 'vue';
export default {
  name: "Firstpage",
  components: {
},
  setup(props) {
      let showPassword = ref(false)
    let togglePassword = () => {
      showPassword.value = !showPassword.value
      console.log(showPassword.value)
    }

    let username = ref('')
    let email = ref('')
    let password = ref('')




    let requestNextPage = () => {
      if(username.value.replaceAll(" ","") == '' || email.value.replaceAll(" ","") == '' || password.value.replaceAll(" ","") == ''){
        props.getError('Please fill out all fields')
        return
      }
      const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if(!emailRegex.test(email.value)){
        props.getError('Please enter a valid email')
        return
      }
      props.getData({username: username.value, email: email.value, password: password.value,keepLoggedIn: document.getElementById('remember-login').checked})
      props.nextPage(3)
    }

    return {
      showPassword,
      togglePassword,
      requestNextPage,
      email,
      username,
      password
    }
  },
  props: {
      nextPage: Function,
      getData: Function,
      getError:Function
  },
};
</script>

<style scoped>
   
*:not(input){
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

#remember-wrapper{
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 15px;
  width: 70%;
}

#remember-wrapper label{
  margin-left: 1rem;
  font-size: 1rem;
}

#remember-wrapper input{
  width: 17.5px;
  margin: 0;
  accent-color: rgba(28,28,28,255);
}


h1 {
  position: absolute;
  top: 0;
  padding: 1rem 0 0 0;
  margin: 0;
  color: black;
}

#showHidePassword{
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.3s ease-in-out;
}


#showHidePassword:hover{
  color: rgba(117,195,204,255);
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

  #button{
  position: absolute;
  bottom: 2rem;
  width: 5rem;
  background-color: rgba(28, 28, 28, 255);
  color: rgba(240, 244, 246);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid rgba(28, 28, 28, 255);
  display: flex;
  justify-content: center;
}

#button:hover {
  background-color: rgba(240, 244, 246);
  color: rgba(28, 28, 28, 255);
  border: 1px solid rgba(28, 28, 28, 255);
}
</style>