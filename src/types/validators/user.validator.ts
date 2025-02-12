import * as zod from 'zod'


export const UserValidator = zod.object({
  id: zod.string(),
  email: zod.string().email(),
  fullName: zod.string().min(2),
  profilePicture: zod.string().url(),
})