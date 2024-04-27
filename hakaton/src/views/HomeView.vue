<template>
    <div class="card-main" >
        <Header />
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
    <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
.card-main{
    clip-path: polygon(
    0% 0%, 0% 92.5%, 1.7% 93.3%, 3.4% 94.1%, 5.1% 94.9%, 6.8% 95.6%, 
    8.5% 96.3%, 10.2% 96.8%, 11.9% 97.3%, 13.6% 97.8%, 15.3% 98.3%, 
    17% 98.7%, 18.7% 99.1%, 20.3% 99.45%, 22% 99.6%, 23.7% 99.7%, 
    25.4% 99.7%, 27.1% 99.6%, 28.8% 99.455%, 30.5% 99.2%, 32.2% 98.8%, 
    33.9% 98.5%, 35.6% 98.1%, 37.3% 97.7%, 39% 97.29%, 40.7% 96.8%, 
    42.4% 96.2%, 44.1% 95.6%, 45.8% 94.7%, 47.5% 93.7%, 49.2% 92.5%, 
    50.8% 91.2%, 52.5% 89.9%, 54.2% 88.7%, 55.9% 87.1%, 57.6% 85.4%, 
    59.3% 83.8%, 61% 82.2%, 62.7% 80.8%, 64.4% 79.5%, 66.1% 78.3%, 
    67.8% 77.3%, 69.5% 76.5%, 71.2% 75.9%, 72.9% 75.4%, 74.6% 75.1%, 
    76.3% 75%, 78% 75.1%, 79.7% 75.4%, 81.4% 75.9%, 83.1% 76.5%, 
    84.7% 77.3%, 86.4% 78.3%, 88.1% 79.5%, 89.8% 80.8%, 91.5% 82.2%, 
    93.2% 83.8%, 94.9% 85.4%, 96.6% 87.1%, 98.3% 88.9%, 100% 90.7%, 
    100% 0%
);
    width:100%;
    height: 95vh;  
    position: relative;
    background-image: url("../images/back4.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba($color: #000000, $alpha: 0.9);
    }
    
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
