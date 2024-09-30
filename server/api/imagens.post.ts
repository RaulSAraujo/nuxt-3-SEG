export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)

  const res = await $fetch<string>(url)

  return res
})
