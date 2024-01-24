<template>
    <div id="hamburger-menu" :class="{showmenu: showHamburgerMenu}">
        <div id="hamburger-list">
            <router-link :to="{ name: 'todooverview' }" class="hamburger-list-item"><span>MY TODOs</span></router-link>
            <router-link :to="{ name: 'teams' }" class="hamburger-list-item"><span>MY TEAMs</span></router-link>
            <div class="hamburger-list-item"><span>MY TODOs</span></div>
        </div>
        <div id="logout" @click="logout">Logout</div>
    </div>
</template>

<script>
export default {
    name: "HamburgerMenu",
    props: {
        showHamburgerMenu: {
            type: Boolean,
            required: true
        }
    },
    setup() {
        let logout = () => {
            localStorage.removeItem('token')
            window.location.href = '/'
        }
        return {logout};
    },  
}
</script>

<style>
#hamburger-menu{
  position: absolute;
  top: 0;
  right: -20vw;
  width: 20vw;
  height: 100vh;
  background-color: rgba(28, 28, 28, 255);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 2rem;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  transition: all .5s ease;
  transition-delay: calc(0s + 0.35s), 0s;
}

#hamburger-list{
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    width: 80%;
    margin-left: 20%;

}
.hamburger-list-item{
    
    transition: all .25s ease;
    cursor: pointer;
}

a{
    text-decoration: none;
    color: white;
}

.hamburger-list-item > span{
    transition: all .25s ease;
}

.hamburger-list-item:hover > span{
    margin-left: 2vw;
    color: #7b52b9;
}

.showmenu{
  right: 0 !important;
}

#logout{
    position: absolute;
    bottom: 2vh;
    font-size: 12px;
    transition: all .25s ease;
}

#logout:hover{
    cursor: pointer;
    color: #7b52b9;
}
</style>