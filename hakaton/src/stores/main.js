
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const useStore = defineStore("mainStore", () => {

    const language = ref("");
    const supportedLanguages = ["en", "sr"];

    watch(language, (newLang) => {
        localStorage.setItem("lang", newLang);
    });

    return {
        language,
        supportedLanguages,
    }

})

export default useStore;
