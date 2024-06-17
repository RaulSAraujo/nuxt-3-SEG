export default defineEventHandler(async (event) => {
    const pages = await useStorage().getItem('data:auth_pages') 
  
    return pages
  })