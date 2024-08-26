export default defineEventHandler(async (event) => {
  const { group_id } = await getQuery(event)
  
  const pages = await useStorage('data').getItem(`group_id_${group_id}:pages`)

  return pages
})