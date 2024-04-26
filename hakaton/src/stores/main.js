import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

  const language = ref("en");

  watch(language, (newLang) => {
    localStorage.setItem("lang", newLang)
  })

})
