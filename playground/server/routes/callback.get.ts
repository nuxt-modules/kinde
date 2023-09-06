export default defineEventHandler(async event => {
  await kindeClient.handleRedirectToApp(event.context.kinde.sessionManager, getRequestURL(event))
  await sendRedirect(event, '/')
})
