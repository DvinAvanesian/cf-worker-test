import jwt from '@tsndr/cloudflare-worker-jwt'
import { parse } from 'cookie'

const getCreds = async (req: Request, env: Env) => {
  const cookie = parse(req.headers.get('Cookie') || '')
  console.log(req.headers.values())

  if (!cookie.token) return new Response(undefined, { status: 401 })

  const verified = jwt.verify(cookie.token, env.SECRET || '')

  if (!verified) return new Response(undefined, { status: 401 })

  const data = jwt.decode(cookie.token) as any

  return Response.json({ user: data.payload?.user, iat: new Date(data.payload.iat).toTimeString() }, { status: 200 })
}

export default getCreds
