import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  ENVIRONMENT: z
    .enum(['development', 'test', 'production'])
    .default('production'),
  REDIS_HOST: z.string(),
  REDIS_HOST_LOCAL: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASS: z.string(),
  APP_SECRET: z.string().default('megapbx_jwt_flux'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
