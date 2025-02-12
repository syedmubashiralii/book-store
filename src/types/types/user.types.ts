import type { z } from 'zod'
import { UserValidator } from '../validators/user.validator'


export type UserType = z.infer<typeof UserValidator>
