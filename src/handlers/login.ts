import jwt from '@tsndr/cloudflare-worker-jwt'

const login = async (req: Request, env: Env) => {
  const json = await req.json()

  if (typeof json !== 'object' || !json || !('username' in json) || !('password' in json)) return new Response(undefined, { status: 400 })

  const { username, password } = json

  if (username === env.USERNAME || password === env.PASSWORD) {
    const payload = { user: username }
    const token = await jwt.sign(payload, env.SECRET || '')

    const headers = new Headers()
    headers.set('Set-Cookie', `token=${token}; HttpOnly; Max-Age=3600; Path=/`)

    return new Response(undefined, { status: 204, headers })
  }

  return new Response(undefined, { status: 401 })
}

export default login
