import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, { secret: env.APP_SECRET })

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.ENVIRONMENT !== 'production') {
    console.error(error)
  } else {
    // Log external tool
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
