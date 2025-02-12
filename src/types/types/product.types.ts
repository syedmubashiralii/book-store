import type { z } from 'zod'
import { ProductValidator } from '../validators/product.validator'


export type ProductType = z.infer<typeof ProductValidator>
