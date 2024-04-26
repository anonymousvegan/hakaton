<template>
    <Header />
    <div class="card-header">
        <p class="card-header-p">
            Samo oni koji se usude da sanjaju velike snove, mogu ostvariti
            velike rezultate.
        </p>
    </div>
    <div class="card-main">
        <div class="card">
            <a href="#">
                <div class="first-img-div">
                    <h1 class="h1">PREDŠKOLCI</h1>
                </div>
            </a>
            <a href="#">
                <div class="first-img-div">
                    <h1 class="h1">OSNOVCI</h1>
                </div>
            </a>
            <a href="#">
                <div class="first-img-div">
                    <h1 class="h1">SREDNjOŠKOLCI</h1>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';

</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

.card {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.card a {
    text-decoration: none;
    width: 100%;
}
.img-row {
    display: flex;
    justify-content: center;
    align-items: center;
}

.first-img-div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.first-img {
    width: 100%;
    height: 100%;
    filter: brightness(80%);
    transition: all 0.3s ease;
    position: absolute;
    z-index: 1;
    margin-bottom: -5px;
}

.first-img-div:hover .first-img {
    filter: brightness(40%);
    transform: scale(1.1);
    z-index: 2;
}

.first-img-div:hover .h1 {
    opacity: 1;
    z-index: 2;
}

.h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 210px;
    margin-top: 200px;
    opacity: 0;
    z-index: 1;
    transition: all 0.3s ease;
    font-size: 50px;
    color: aliceblue;
}

.card-header {
    height: 140px;
    width: 100%;
    background-color: #232121a1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.card-header-p {
    width: 80%;
    font-size: 30px;
    font-family: "Great Vibes", cursive;

    color: white;
}
@media only screen and (max-width: 768px) {
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .first-img-div {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .first-img {
        width: 100%;
        height: 120%;
        filter: brightness(80%);
        transition: all 0.3s ease;
        position: absolute;
        z-index: 1;
        margin-bottom: -5px;
    }
}
@media only screen and (max-width: 400px) {
    .first-img {
        width: 100%;
        height: 90%;
        filter: brightness(80%);
        transition: all 0.3s ease;
        position: absolute;
        z-index: 1;
        margin-bottom: -5px;
    }
}
</style>
