<template>
    <div class="errornotify-wrapper" :style="{animation: animation}">
        <h1>Error</h1>
        <p>{{ Text }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: "ErrorNotification",
    props: {
        Text: {
            type: String,
            required: true
        }
    },
    setup() {
        let animation = ref('flyin 1.0s ease forwards')

        setTimeout(() => {
            animation.value = 'flyout 1.0s ease forwards';
        }, 5000);
        return{
            animation
        }
    }
}
</script>

<style>
.errornotify-wrapper {
    position: fixed;
    top: 5rem;
    right: 1.5rem;
    width: 20rem;
    height: fit-content;
    background-color: rgba(240, 244, 246);
    z-index: 100;
    padding: 1rem;
    border-radius: 2rem;
    transform: translateX(150%);
    /* animation: flyin 1.0s ease forwards; */
    color: rgb(201, 37, 37);
}

@keyframes flyin {
    0% {
        transform: translateX(150%);
    }
    100% {
        transform: translateX(0%);
    }
}

@keyframes flyout {
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(150%);
    }
    
}

h1{
    font-size: 1.5rem;
    margin-left: 1rem;
    margin-top: 0rem;
}

p{
    font-size: 1rem;
    margin-left: 1rem;
    margin-top: 0rem;
}
</style>