<template>
  <div class="navbar-wrapper">
    <nav>
      <router-link :to="{ name: 'home' }" id="logo-wide"><img src="../assets/logo-wide-white.png" /></router-link>
      
      <ul>
        <li>
          <router-link :to="{ name: 'home' }">Home</router-link>
        </li>

        <li>
          <router-link :to="{ name: 'myaccount' }">My Account</router-link>
        </li>
        <li id="login" v-if="!isTokenAvailable">
          <router-link :to="{ name: 'login' }">LOGIN</router-link>
        </li>
        <li id="register" v-if="!isTokenAvailable">
          <router-link :to="{ name: 'register' }">REGISTER</router-link>
        </li>
        <li id="hamburger" v-if="isTokenAvailable">
          <input type="checkbox" id="checkbox" @click="showHamburgerMenu = !showHamburgerMenu">
          <label for="checkbox" class="toggle">
            <div class="bar bar--top"></div>
            <div class="bar bar--middle"></div>
            <div class="bar bar--bottom"></div>
          </label>
        </li>
      </ul>
    </nav>

    <!-- <div id="hamburger-menu" :class="{showmenu: showHamburgerMenu}">
      
    </div> -->
    <HambugerMenu :showHamburgerMenu="showHamburgerMenu" v-if="isTokenAvailable"/>

  </div>
</template>

<script>
import { ref } from 'vue';
import utils from '../scripts/utils';
import HambugerMenu from './HambugerMenu.vue';
export default {
  name: "Navbar",
  components: {
    HambugerMenu
  },
  props: {
    tokenAvailable: {
      type: Boolean,
      required: false
    }
  },
  setup(props) {
    let isTokenAvailable = ref(true);
    let showHamburgerMenu = ref(false);
    async function getAvailableTokens(){
      isTokenAvailable.value = await utils.isTokenValid()
      let data = await utils.getUserData();
    } 
    getAvailableTokens()
    return { isTokenAvailable, showHamburgerMenu };
  },
};
</script>

<style scoped>

#logo-wide {
  margin-left: 1rem;
}

img {
  width: 6rem;
}

img:hover {
  cursor: pointer;
}

nav {
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(28, 28, 28, 255);
  padding: 0.2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.158);
  height: 7vh;
  width: 100vw;
  font-size: 17px;
  color: white !important;
}

ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin-right: 4rem;
}

ul li {
  margin-left: 1rem;
  cursor: pointer;
}

ul li a {
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;

  display: inline-block;
  color: white;
}

ul li:not(#login):not(#register):hover a {
  transform: translateY(-0.2rem);
  color:#7b52b9;
}

/* ul li::after{
        content: '';
        display: block;
        width: 100%;
        height: 0.3vh;
        background-color: rgba(117,195,204,255);
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        opacity: 0;
        transition: all 0.3s ease;
    }

    ul li:hover::after{
        opacity: 1;
    } */

#login {
  margin-left: 3rem;
}

#register {
  margin-right: -3rem;
}

#login,
#register {
  background-color: #7b52b9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

#login:hover a,
#register:hover a {
  text-decoration: underline;
}

#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 40px;
  cursor: pointer;
  margin: auto;
  display: block;
  height: calc(4px * 3 + 11px * 2);
}

.bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  border-radius: calc(3px / 2);
  background: #7b52b9;
  color: inherit;
  opacity: 1;
  transition: none 0.35s cubic-bezier(.5, -0.35, .35, 1.5) 0s;
}

/***** Spin Animation *****/

.bar--top {
  bottom: calc(50% + 8px + 3px/ 2);
  transition-property: bottom, transform;
  transition-delay: calc(0s + 0.35s), 0s;
}

.bar--middle {
  top: calc(50% - 3px/ 2);
  transition-property: opacity;
  transition-delay: calc(0s + 0.35s);
}

.bar--bottom {
  top: calc(50% + 8px + 3px/ 2);
  transition-property: top, transform;
  transition-delay: calc(0s + 0.35s), 0s;
}

#checkbox:checked+.toggle .bar--top {
  bottom: calc(50% - 3px/ 2);
  transform: rotate(-135deg);
  transition-delay: 0s, calc(0s + 0.35s);
}

#checkbox:checked+.toggle .bar--middle {
  opacity: 0;
  transition-duration: 0s;
  transition-delay: calc(0s + 0.35s);
}

#checkbox:checked+.toggle .bar--bottom {
  top: calc(50% - 3px/ 2);
  transform: rotate(-225deg);
  transition-delay: 0s, calc(0s + 0.35s);
}

#hamburger{
  margin-left: 5rem;
  margin-right: -2rem;
  z-index: 999;
}



</style>