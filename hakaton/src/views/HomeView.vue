<template>
    <div class="content card-main">
        <Header />

        <teleport to="body" v-if="playing">
            <div class="game-dialog">
                <div class="dialog-content">

                    <div class="image-container">
                        <img :src="currentImage" alt="" ref="image" />

                        <Volume @click="speakCurrentWord"  />
                    </div>

                    <div class="input">
                        <input
                            :maxlength="currentWord.length"
                            type="text"
                            v-model="currentWordInput"
                            :style="{
                                width: currentWord.length + 'ch',
                            }"
                        />
                    </div>
                </div>
            </div>
        </teleport>
    </div>

    <div class="cards">
        <div class="card" @click="play('animals')">
            <div class="wrapper">
                <img :src="dogUrl" alt="" />

                <div class="play">Životinje</div>
            </div>
        </div>

        <div class="card" @click="play('vegetables')">
            <div class="wrapper">
                <div class="play">Povrće</div>

                <img :src="carrotUrl" alt="" />
            </div>
        </div>

        <div class="card" @click="play('fruits')">
            <div class="wrapper">
                <div class="play">Voće</div>
                <img :src="appleUrl" alt="" />
            </div>
        </div>
    </div>


    <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue";
import axios from "axios";
import { ref, computed, watch, onMounted } from "vue";
import carrotUrl from "../images/carrot.avif";
import dogUrl from "../images/dog.jpg";
import appleUrl from "../images/apple.webp";
import IconEn from "../icons/flags/gb.svg"
import Volume from "../icons/volume.svg";

const photos = ref({});

const activeCategory = ref(null);
const currentIndex = ref(0);
const playing = ref(false);
const currentImage = ref(null);
const image = ref(null);

const currentWordsArray = computed(() => {
    if (activeCategory.value === "animals") {
        let arr = [
            "dog",
            "cat",
            "bird",
            "horse",
            "goat",
            "panda",
            "squirrel",
            "rabbit",
            "cow",
            "fish",
            "chicken"
        ];

        return arr;
    }

    if (activeCategory.value === "vegetables") {
        return ["carrot", "pepper", "cucumber"];
    }

    if (activeCategory.value === "fruits") {
        return ["apple", "banana", "orange", "peach", "pear", "strawberry", "raspberry", "blueberry", "blackberry", "lemon"];
    }

    if (activeCategory.value === "objects") {
        return ["house", "car", "school", "table", "chair", "bed", "glass", "mirror", "door", "window" ];
    }

});

const currentWord = computed(() => {
    return currentWordsArray.value?.[currentIndex.value] || "";
});

const currentWordInput = ref("");

async function getImages(keyword) {
    const url = "https://api.unsplash.com/search/photos";

    let res = await axios.get(url, {
        params: {
            query: keyword + " " + activeCategory.value,
            client_id: "e4PUhTgLcJgxCN-kPL0icYOMcVNTh2wtojZxyb2JZNQ",
        },
    });

    return res;
}

function getRandomPhoto(keyword) {
    const randomNumber = Math.floor(
        Math.random() * photos.value[keyword].length
    );
    return photos.value[keyword][randomNumber];
}

async function play(category) {
    playing.value = true;

    activeCategory.value = category;

    await getImagesForCurrentWord();

    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = "sr-RS"; // Postavljanje jezika na srpski
    speechSynthesis.speak(utterance);
}

async function getImagesForCurrentWord() {
    const images = await getImages(currentWord.value);

    photos.value[currentWord.value] = images.data.results.map(
        (r) => r.urls.regular
    );
    const image = getRandomPhoto(currentWord.value);

    currentImage.value = image;
}

async function speakCurrentWord(){
    console.log("pričam");

    console.log(currentWord.value);

    if (!window.speechSynthesis) {
        console.log("Web Speech API not supported in this browser.");
        return;
    }

    // Stop any currently speaking utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentWord.value);

    // Optional: Set other properties
    utterance.pitch = 1; // Range between 0 and 2
    utterance.rate = 1; // Range between 0.1 and 10
    utterance.volume = 1; // Range between 0 and 1

    utterance.onstart = () => console.log("Start speaking...");
    utterance.onend = () => console.log("Finished speaking.");
    utterance.onerror = (event) => console.log("Error occurred:", event.error);

    speechSynthesis.speak(utterance);
}

watch(currentWordInput, (newWord) => {
    if (newWord.toLowerCase() === currentWord.value.toLowerCase()) {
        if (currentIndex.value === currentWordsArray.value?.length - 1) {
            stop();
        }

        currentIndex.value++;
        currentWordInput.value = "";
    }
});

watch(currentIndex, () => {
    if (!playing.value) return;

    getImagesForCurrentWord();
});

function stop() {
    activeCategory.value = "";
    currentImage.value = "";
    currentIndex.value = 0;

    console.log("game over");
    playing.value = false;
}

onMounted(async () => {
    window.addEventListener("keydown", (e) => {
        console.log(e.key);
        if (e.key === "Escape") stop();
    });
});


</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}
.card-main {
    clip-path: polygon(
        0% 0%,
        0% 92.5%,
        1.7% 93.3%,
        3.4% 94.1%,
        5.1% 94.9%,
        6.8% 95.6%,
        8.5% 96.3%,
        10.2% 96.8%,
        11.9% 97.3%,
        13.6% 97.8%,
        15.3% 98.3%,
        17% 98.7%,
        18.7% 99.1%,
        20.3% 99.45%,
        22% 99.6%,
        23.7% 99.7%,
        25.4% 99.7%,
        27.1% 99.6%,
        28.8% 99.455%,
        30.5% 99.2%,
        32.2% 98.8%,
        33.9% 98.5%,
        35.6% 98.1%,
        37.3% 97.7%,
        39% 97.29%,
        40.7% 96.8%,
        42.4% 96.2%,
        44.1% 95.6%,
        45.8% 94.7%,
        47.5% 93.7%,
        49.2% 92.5%,
        50.8% 91.2%,
        52.5% 89.9%,
        54.2% 88.5%,
        55.9% 87%,
        57.6% 85.4%,
        59.3% 83.8%,
        61% 82.2%,
        62.7% 80.8%,
        64.4% 79.5%,
        66.1% 78.3%,
        67.8% 77.3%,
        69.5% 76.5%,
        71.2% 75.9%,
        72.9% 75.4%,
        74.6% 75.1%,
        76.3% 75%,
        78% 75.1%,
        79.7% 75.4%,
        81.4% 75.9%,
        83.1% 76.5%,
        84.7% 77.3%,
        86.4% 78.3%,
        88.1% 79.5%,
        89.8% 80.8%,
        91.5% 82.2%,
        93.2% 83.8%,
        94.9% 85.4%,
        96.6% 87.1%,
        98.3% 88.9%,
        100% 90.7%,
        100% 0%
    );
    width: 100%;
    height: 95vh;
    position: relative;
    background-image: url("../images/back7.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba($color: #000000, $alpha: 0.60);
        z-index: -1;
    }
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-inline: auto;
    gap: 40px;
    width: 1500px;
    margin-top: 20px;
    z-index: 10;
    position: relative;
    margin-bottom: 20px;

    .card {
        height: 400px;
        width: 400px;

        filter: brightness(80%);
        transition: all 0.3s ease;

        &.card:nth-child(1) {
            border-radius: 30% 70% 70% 30% / 37% 35% 65% 63%;
        }

        &.card:nth-child(2) {
            border-radius: 53% 47% 49% 51% / 56% 66% 34% 44%;
        }

        &.card:nth-child(3) {
            border-radius: 53% 47% 35% 65% / 46% 43% 57% 54%;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
        }

        .wrapper {
            border-radius: inherit;
            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            transition: all 0.3s ease;
            transform-origin: center center;
            position: relative;
            cursor: pointer;
            border: 1px solid black;
            overflow: hidden;

            .play {
                position: absolute;
                font-size: 2rem;
                color: white;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(1px);

                opacity: 0;
                transition: all 0.3s ease-in-out;

                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .button-container {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform-origin: center center;
                transform: translate(-50%) rotate(30deg);
                animation-duration: 5s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
                animation-fill-mode: forwards;
                background: #cccccc50;
                border-radius: 30%;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3 ease-in-out;
                opacity: 0.5;

                img {
                    width: 100px;
                    border-radius: none;
                    outline: 5px solid rgba(117, 128, 0, 0.463);
                    outline-offset: 10px;
                    transition: all 0.3s;
                }

                &.first-button {
                    bottom: 20px;
                    animation-name: play1;
                    transform: translate(-70%) rotate(-30deg);
                }

                &.sec-button {
                    animation-name: play2;
                    transform: translate(-50%) rotate(0deg);
                }

                &.third-button {
                    bottom: 20px;
                    animation-name: play3;
                }
            }

            &:hover {
                transform: scale(1.1);

                .play {
                    opacity: 1;
                }

                .button-container {
                    opacity: 1;
                    animation-duration: 2s;

                    img {
                        scale: 1.2;
                        outline: 5px solid rgba(117, 128, 0, 0.615);
                    }
                }
            }
        }
    }
}

.game-dialog {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #000000d6;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;

    .dialog-content {
        width: 1000px;
        height: 600px;
        border-radius: 20px;
        border: 1px solid white;
        padding: 50px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;


        .image-container{
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;


            height: 450px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50px;
            }


            svg{
                position: absolute;
                z-index: 30;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                top: 0;
                right: 0;
                transform: translate(15px, -10px);
                fill: rgb(134, 134, 134);
                cursor: pointer;

                background-color: white;
                padding: 10px;
                rotate: -20deg;
                transition: all .3s ease-in-out;

                &:hover{
                    scale: 1.1;
                }
            }

        }

        .input {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;

            transform: translateY(20px);

            input {
                height: 40px;
                font-size: 2rem;
                background-color: transparent;
                border: 0;
                outline: 0;
                color: white;
                border-bottom: 2px solid white;

                text-align: center;
            }
        }
    }
}

</style>
