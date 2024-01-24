<template>
  <div class="myaccount-wrapper">
    <div class="subpages">
      <ul>
        <li>test1</li>
        <li>test2</li>
        <li>test3</li>
      </ul>
    </div>
    <form action="post">
      <br>
      <h1>My Account</h1>
      <div class="wrapper">
        <div class="container">
          <img class="pfp" src="../../assets/logo.png" alt="" id="pfp" />
          <input @change="pictureUpload()" type="file" id="selectedFile" style="display: none" />
          <input type="button" class="material-symbols-outlined" value="edit"
            onclick="document.getElementById('selectedFile').click();" />
        </div>
        <div class="text">
          <h2>full name</h2>
          <input name="name" id="name" type="text" value=firstname />
          <h2>username</h2>
          <input name="username" id="username" type="text" v-model="username" />
          <h2>email</h2>
          <input name="email" id="email" type="text" value="clemens.wolfsberger@htl.rennweg.at" />
          <h2>status</h2>
          <input name="status" id="status" type="status" value="busy" />
          <br />
          <button class="button-3" role="button">
            <span>Update profile</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import App from "@/App.vue";
import utils from "../../scripts/utils";
import { ref } from "vue";
export default {
  setup() {
    let username = ref('');
    function getData() {
      fetch('http://213.229.25.14:3080/getUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: localStorage.getItem('token')
        })
      }).then(res => res.json())
        .then(data => {
          let userData = data[0]
          console.log(userData)
          username.value = userData.username
        })
    }
    getData()




    let id = 0;
    let removeReadonly = () => { };

    let pictureUpload = () => {
      let file = document.getElementById("selectedFile").files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const hiddenCanvas = document.getElementById("hiddenCanvas");
        const ctx = hiddenCanvas.getContext("2d");

        hiddenCanvas.width = 200;
        hiddenCanvas.height = 200;

        const img = new Image();
        img.src = reader.result;

        img.onload = function () {
          ctx.drawImage(img, 0, 0, 200, 200);

          const resizedImageData = hiddenCanvas.toDataURL("image/jpeg");

          document.getElementById("pfp").src = resizedImageData;
        };
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    };

    return {
      removeReadonly,
      pictureUpload,
      username
    };
  },
};
</script>

<style scoped>
.subpages {
  width: 150px;
}

.myaccount-wrapper {
  display: flex;
}

.text input {
  border: #292929 solid 2px;
  color: black;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  font-size: 15px;
}

.person {
  border: none !important;
  background-color: transparent !important;
}

.container {
  margin-top: 60px;
  position: relative;
  display: inline-block;
  margin-right: 60px;
}

.pfp {
  border-radius: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  max-width: 100%;
  width: 200px;
}

/* CSS */
.button-3 {
  margin-top: 15px;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.button-3:hover {
  background-color: #2c974b;
}

.button-3:focus {
  box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
  outline: none;
}

.button-3:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, 0.1);
  color: rgba(255, 255, 255, 0.8);
  cursor: default;
}

.button-3:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
}

* {
  color: white;
}

.material-symbols-outlined {
  background-color: grey;
  position: absolute;
  top: 160px;
  left: 10px;
  z-index: 1;
  padding: 2px;
  border: white solid;
  border-radius: 3px;
}

.material-symbols-outlined:hover {
  background-color: lightgrey;
  cursor: pointer;
}

.editpen {
  width: 25px;
}

.infos {
  border-radius: 5%;
  width: 70vw;
  height: 80vh;
  margin-left: 15vw;
}

h1 {
  font-size: 2.5rem;
}

ul {
  margin-top: 100px;
}

h2 {
  color: #e4e4e4;
  margin-top: 15px;
  margin-bottom: 5px;
}

.wrapper {
  display: flex;
  background-color: rgb(44, 44, 44);
  padding: 50px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>