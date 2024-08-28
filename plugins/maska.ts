import { tokens } from 'maska'
import { vMaska } from 'maska/vue'

export default defineNuxtPlugin((nuxtApp) => {
    tokens['S'] = { pattern: /[a-zA-Z]/ }
    tokens['A'] = { pattern: /[a-zA-Z]/, transform: (char) => char.toUpperCase() }
    tokens['a'] = { pattern: /[a-zA-Z]/, transform: (char) => char.toLowerCase() }
    tokens['+'] = { pattern: /[0-9]/, multiple: true }
    tokens['X'] = { pattern: /[A-Z0-9]/, transform: (char) => char.toUpperCase(), repeated: true }

    nuxtApp.vueApp.directive('maska', vMaska)
})