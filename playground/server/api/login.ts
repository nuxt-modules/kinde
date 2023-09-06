export default defineEventHandler(async event => {
  const loginURL = await kindeClient.login(event.context.kinde.sessionManager)
  await sendRedirect(event, loginURL.href)
})
