export default defineEventHandler(async (event) => {
    const operations = await useStorage().getItem('data:operations') 
  
    return operations
  })