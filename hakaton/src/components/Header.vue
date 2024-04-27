<template>
    <nav>
        <div class="left">

            <h1>Smarty</h1>
            <div class="logo">
                <img :src="Logo" alt="">
            </div>
        </div>
        <div class="right">

            <template v-if="0">
                <IconEn
                    v-if="store.language === 'en'"
                    @click="store.language = 'sr'"
                />
                <IconSr
                    :src="IconSr"
                    v-if="store.language === 'sr'"
                    @click="store.language = 'en'"
                />

            </template>
            <div class="menu">
                <i class="fas fa-bars" @click="openMenu"></i>
                <div id="mySidenav" class="sidenav">
                    <a href="javascript:void(0)" class="closebtn" @click="closeMenu()">&times;</a>
                    <a href="#">Log out</a>
                    <a>Zivotinje</a>
                    <div class="progress">
                        <div class="inner"></div>
                    </div>
                    <a>Povrce</a>
                    <div class="progress">
                        <div class="inner"></div>
                    </div>
                    <a>Voce</a>
                    <div class="progress">
                        <div class="inner"></div>
                    </div>
                    <a>Predmeti</a>
                    <div class="progress">
                        <div class="inner"></div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import useStore from "@/stores/main";
import IconEn from "../icons/flags/gb.svg";
import IconSr from "../icons/flags/rs.svg";
import Logo from "../icons/logo.png?url"
import {ref} from "vue";
import Cookies from "js-cookie";

const store = useStore();
const isVisible = ref(false);
const isLog = ref(false);


function logOut() {
    Cookies.remove("user_token");
}
function openMenu() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeMenu() {
    document.getElementById("mySidenav").style.width = "0";
}
</script>

<style scoped lang="scss">
#dropdown {
    position: absolute;
}
#dropdown.show {
    display: flex;
}
 .sidenav {
  height: 100%; 
  width: 0; 
  position: fixed; 
  z-index: 1; 
  top: 0; 
  right: 0;
  background-color: #111; 
  overflow-x: hidden; 
  padding-top: 60px; 
  transition: 0.5s; 
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}


@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
} 
.menu {
    position: relative;
    > i {
        font-size: 30px;
        color: white;
    }
}
nav {

    --color: #184e3f;

    display: flex;
    align-items: center;
    height: 100px;
    border-radius: 20px;
    padding: 20px;

    .left{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        

        .logo{
            width: 25px;
            height: 25px;
            margin-bottom: 15px;
            img{
                width: 100%;
                height: 100%;

            }
        }

        h1{
            font-size: 2rem;
            color: rgb(255, 255, 255);
        }
    }

    .right{
        display: flex;
        gap: 10px;
        svg{
            overflow: hidden;
            border-radius: 50%;
            width: 30px;
            height: 30px;
        }
    }

}
</style>
