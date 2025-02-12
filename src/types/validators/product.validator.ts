import * as zod from 'zod'

export const ProductValidator = zod.object({
  id: zod.string(),
  bookName: zod.string().min(2),
  description: zod.string().min(2),
  imageUrl: zod.string().min(2),
  language: zod.string().min(2),
  category: zod.string().min(2),
  userId: zod.string(),
})