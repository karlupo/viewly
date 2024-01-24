<template>
  <div class="home">
    <div id="main-header">More Organization with <span id="header-logo">Viewly</span></div>
    <p id="main-p">Optimize your workflow, manage your todos, create teams and way more!</p>
    <div id="main-buttons">
      <button>Start using Viewly</button>
      <button>Go To Your Workspace</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import utils from '../scripts/utils';
import router from "@/router";
export default {
  name: "HomeView",
  components: {},
  setup() {
    let isTokenAvailable = ref(true);
    isTokenAvailable.value = utils.isTokenValid()
    utils.getUserData()
    return {isTokenAvailable};
  },
};
</script>

<style scoped>
#main-header{
  font-size: 50px;
  color: white;
  text-align: center;
  margin-top: 50px;
  display: flexbox;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 900;
}

#header-logo{
  text-decoration: underline;
  text-decoration-color: #7b52b9;
}

#main-p{
  font-size: 20px;
  color: white;
  text-align: center;
  margin-top: 10px;
  display: flexbox;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
}

#main-buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  margin-top: 40px;
  gap:20px
}

#main-buttons button{
  padding: 10px 15px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  color: #7b52b9;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  border: #7b52b9 2px solid;
  transition: 0.2s;
  width: 250px;
  white-space: nowrap;
}

@media (max-width: 600px) {
  #main-buttons button {
    white-space: normal; /* Text wird bei einer Bildschirmbreite von 600px umgebrochen */
    width: 150px;
  }
}

#main-buttons button:hover{
  background-color: #7b52b9;
  color: white;
}


</style>
