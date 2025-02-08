import getCreds from '../handlers/getCred'
import login from '../handlers/login'

const auth = async (req: Request, env: Env) => {
  if (req.method === 'POST') return await login(req, env)
  if (req.method === 'GET') return await getCreds(req, env)
  else return new Response(undefined, { status: 405 })
}

export default auth
