<template>
    <div class="content">
        <Header />
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

        <teleport to="body" v-if="playing">
            <div class="game-dialog">
                <div class="dialog-content">
                    <img :src="currentImage" alt="" ref="image"/>

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
</template>

<script setup>
import Header from "@/components/Header.vue";
import axios from "axios";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import carrotUrl from "../images/carrot.avif";
import dogUrl from "../images/dog.jpg";
import appleUrl from "../images/apple.webp";
// import buttonUrl from "../icons/button.png"

const photos = ref({});

const activeCategory = ref(null);
const currentIndex = ref(0);
const playing = ref(false);
const currentImage = ref(null);
const image = ref(null)

const currentWordsArray = computed(() => {
    if (activeCategory.value === "animals") {
        let arr = [
            "Dog",
            "Cow",
            "Cat",
            "Horse",
            "Donkey",
            "Tiger",
            "Lion",
            "Panther",
            "Leopard",
            "Cheetah",
            "Bear",
            "Elephant",
            "Turtle",
            "Crocodile",
            "Rabbit",
            "Pigeon",
            "Albatross",
            "Crow",
            "Fish",
            "Dolphin",
            "Frog",
            "Whale",
            "Alligator",
            "Eagle",
            "Fox",
            "Goat",
            "Jackal",
            "Emu",
            "Armadillo",
            "Goose",
            "Wolf",
            "Gorilla",
            "Chimpanzee",
            "Orangutan",
            "Antelope",
            "Bat",
            "Giraffe",
        ];

        return arr;
    }

    if (activeCategory.value === "vegetables") {
        return ["carrot", "pepper", "cucumber"];
    }

    if (activeCategory.value === "fruits") {
        return ["apple", "banana", "orange", "peach", "pear"];
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
    utterance.lang = 'sr-RS'; // Postavljanje jezika na srpski
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

onMounted( async () => {
    window.addEventListener("keydown", (e) =>{

        console.log(e.key);
        if(e.key === "Escape") stop();
    })
})

</script>

<style lang="scss">
.content {
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
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #000000d6;
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;

    .dialog-content {
        width: 1000px;
        height: 500px;
        margin-inline: auto;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 50px;
        }

        .input {
            position: absolute;
            bottom: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;

            input {
                outline: 1px solid red;
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

// @keyframes play1{
//     0% {
//         rotate: 0deg;
//     }
//     50% {
//         rotate: 5deg;
//     }
// }
// @keyframes play2{
//     0% {
//         rotate: 0deg;
//     }
//     50% {
//         rotate: 5deg;
//     }
// }
// @keyframes play3{
//     0% {
//         rotate: 0deg;
//     }
//     50% {
//         rotate: 5deg;
//     }
// }
</style>
