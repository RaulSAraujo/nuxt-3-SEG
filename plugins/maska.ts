import { tokens } from 'maska'
import { vMaska } from 'maska/vue'

export default defineNuxtPlugin((nuxtApp) => {
    tokens['S'] = { pattern: /[a-zA-Z]/ }
    tokens['A'] = { pattern: /[a-zA-Z]/, transform: (char) => char.toUpperCase() }
    tokens['a'] = { pattern: /[a-zA-Z]/, transform: (char) => char.toLowerCase() }
    tokens['N'] = { pattern: /^[0-9]+$/, multiple: true } // Aceita numeros
    tokens['+'] = { pattern: /^[0-9\W]+$/, multiple: true } // Aceita numeros e caracter especial
    tokens['X'] = { pattern: /^[a-zA-Z0-9\W]+$/, transform: (char) => char.toUpperCase(), repeated: true } // Aceita numeros, letras e caracter especial

    nuxtApp.vueApp.directive('maska', vMaska)
})