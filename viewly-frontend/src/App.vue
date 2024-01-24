<template>
  <Navbar />
  <router-view />
  <SiteFooter/>
</template>

<script>
import { ref } from 'vue';
import { provide } from 'vue';
import Navbar from "./components/Navbar.vue";
import SiteFooter from "./components/SiteFooter.vue";
export default {
  name: "App",
  components: {
    Navbar,
    SiteFooter
  },
  setup() {

    const rerender = ref(0);


    let rerenderNavbar = () => {
      rerender.value += 1;
    }

    provide('rerender', rerenderNavbar);

    return {
      rerender: 0,
      rerenderNavbar
    };
  }
};
</script>

<style src="../public/common.css"></style>
