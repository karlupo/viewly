<template>
    <div class="register-wrapper">
      <ErrorNotification :Text="errorMessage" v-if="errorMessage != ''" />
      <Firstpage :nextPage="nextpage" :getData="getData" :getError="getError" v-if="page==1" ref="firstPage"/>      
      <Secondpage :nextPage="nextpage" :getData="getData" :getError="getError" v-if="page==2"/>
      
      
    </div>
  </template>
  
  <script>
  
  import Firstpage from '../components/Register/Firstpage.vue'
  import Secondpage from '../components/Register/SecondPage.vue'
  import ErrorNotification from '../components/Notifications/ErrorNotification.vue';
  import { sha256 } from 'js-sha256';
  import { ref, watch} from 'vue';
  import router from '@/router';
  export default {
    name: "Register",
    components: {
      Firstpage,
      Secondpage,
      ErrorNotification
    },
    data(){

      let errorMessage = ref('')

      let requestRegister = (formData) => {
      fetch('http://213.229.25.14:3080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: sha256(formData.password),
          email: formData.email,
          firstname: formData.firstname,
          lastname: formData.lastname,
          keepLoggedIn: formData.keepLoggedIn
        })
      }).then(res => res.json())
        .then(data => {
          if (data.token) {
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

      return{
        page: 1,
        formData: {},
        requestRegister,
        errorMessage
      }
    },
    methods: {
      nextpage(newpage){
        if(newpage == 3){
          this.requestRegister(this.formData)
        }else{
          this.page = newpage
        }


      },
      getData(data){
        this.formData = {...this.formData, ...data}
      },
      getError(error){
        this.errorMessage = error
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  