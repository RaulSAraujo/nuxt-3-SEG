export default defineEventHandler((event) => {
    useStorage('data').clear()
})