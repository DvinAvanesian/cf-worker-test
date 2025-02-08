import auth from './routes/auth'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const reqURL = new URL(request.url)
    if (reqURL.pathname === `/api/v${env.API_VERSION}/auth`) return await auth(request, env)
    else return new Response(undefined, { status: 404 })
  }
} satisfies ExportedHandler<Env>
