export default defineEventHandler(async event => {
  const loginURL = await kindeClient.login(event.context.kinde.sessionManager)
  
  return {
    success: true,
    loginURL
  }
})
