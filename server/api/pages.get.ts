export default defineEventHandler(async () => {
    const pages = await useStorage().getItem('data:auth_pages') 

    return pages
  })