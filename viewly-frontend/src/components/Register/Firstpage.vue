<template>
  <div class="firstpage-wrapper">
    <form>
      <h1>Register</h1>
      <div class="input-field">
        <div class="inputs-wrapper">
          <span class="material-symbols-outlined">badge</span><input v-model="firstname" type="text" id="firstname" placeholder="Firstname" />
        </div>
      </div>
      <div class="input-field">
        <div class="inputs-wrapper">
          <span class="material-symbols-outlined">signature</span><input v-model="lastname" type="text" id="lastname" placeholder="Lastname" />
          
        </div>
      </div>
      <div id="login-div">
        <p>Have an account? <router-link id="router-link" :to="{ name: 'login' }">Login</router-link></p>
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


    let firstname = ref('')
    let lastname = ref('') 

    let requestNextPage = () => {
      if(firstname.value.replaceAll(" ","") == '' || lastname.value.replaceAll(" ","") == ''){
        props.getError('Please fill out all fields')
        return
      }
      props.getData({firstname: firstname.value, lastname: lastname.value})
      props.nextPage(2)
    }

    return {
    requestNextPage,
    firstname,
    lastname
    }
  },
  props: {
    nextPage: Function,
    getData: Function,
    getError: Function
  },
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

#login-div {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 77%;
}

#login-div p {
  font-size: 15px;
}

#router-link{
  color: black;
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

#button {
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