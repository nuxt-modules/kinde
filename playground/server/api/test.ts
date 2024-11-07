export default defineEventHandler((event) => {
  console.log(event.context.kinde)
  return {
    hello: 'world',
  }
})
