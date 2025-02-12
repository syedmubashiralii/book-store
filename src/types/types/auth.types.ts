import type { z } from 'zod'
import type {
  LoginValidator,RegisterValidator
} from '../validators/auth.validator'



export type LoginRequestType = z.infer<typeof LoginValidator>

export type RegisterRequestType = z.infer<typeof RegisterValidator>
