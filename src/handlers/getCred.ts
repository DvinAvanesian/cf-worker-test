import jwt from '@tsndr/cloudflare-worker-jwt'
import { parse } from 'cookie'

const getCreds = async (req: Request, env: Env) => {
  const cookie = parse(req.headers.get('Cookie') || '')
  console.log(req.headers.values())

  if (!cookie.token) return new Response(undefined, { status: 401 })

  const verified = jwt.verify(cookie.token, env.SECRET || '')

  if (!verified) return new Response(undefined, { status: 401 })

  const decodedPayload = jwt.decode(cookie.token)

  return Response.json(decodedPayload, { status: 200 })
}

export default getCreds
