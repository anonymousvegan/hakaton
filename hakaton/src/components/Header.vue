<template>
    <nav>
        <div class="left">
            <div class="logo">
                <img :src="Logo" alt="">
            </div>

            <h1>BrainBridge</h1>

        </div>
        <div class="right">
            <IconEn
                v-if="store.language === 'en'"
                @click="store.language = 'sr'"
            />
            <IconSr
                :src="IconSr"
                v-if="store.language === 'sr'"
                @click="store.language = 'en'"
            />
        </div>
    </nav>
</template>

<script setup>
import useStore from "@/stores/main";
import IconEn from "../icons/flags/gb.svg";
import IconSr from "../icons/flags/rs.svg";
import Logo from "../icons/logo.png?url"

const store = useStore();

</script>

<style scoped lang="scss">

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
        gap: 20px;

        .logo{
            width: 40px;
            height: 40px;
            img{

                width: 100%;
                height: 100%;

            }
        }

        h1{
            font-size: 1.5rem;
            color: var(--color);
        }
    }

    .right{

        svg{
            overflow: hidden;
            border-radius: 50%;
            width: 30px;
            height: 30px;
        }
    }

}
</style>
