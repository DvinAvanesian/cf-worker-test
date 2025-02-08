import getCreds from '../handlers/getCred'
import login from '../handlers/login'

const auth = async (req: Request, env: Env) => (req.method === 'POST' ? await login(req, env) : await getCreds(req, env))

export default auth
