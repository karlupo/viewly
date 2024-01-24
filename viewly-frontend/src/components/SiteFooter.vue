<template>
    <footer>
        <p>Benjamin Höllmüller | Clemens Wolfsberger | San Rosch</p>
    </footer>
</template>
  
<script>
import { ref } from 'vue';
export default {
    name: "SiteFooter",
    components: {

    },

    setup() {
        return {

        };
    },
};
</script>
  
<style scoped>
footer {
    background-color: rgb(24, 24, 24);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.158);
    position: absolute;
    bottom: 0;
    width: 100%;
    color: rgb(95, 95, 95);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7vh;
    }
</style>