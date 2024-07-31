import { tokens } from 'maska'
import { vMaska } from 'maska/vue'

export default defineNuxtPlugin((nuxtApp) => {
    tokens['S'] = { pattern: /[a-zA-Z]/ }
    tokens['A'] = { pattern: /[a-zA-Z]/, transform: (char) => char.toUpperCase() }
    tokens['a'] = { pattern: /[a-zA-Z]/, transform: (char) => char.toLowerCase() }

    nuxtApp.vueApp.directive('maska', vMaska)
})