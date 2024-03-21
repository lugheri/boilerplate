import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { authenticate, test } from './controllers/authenticate.controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticated routes */
  app.get('/test', { onRequest: [verifyJWT] }, test)
}
