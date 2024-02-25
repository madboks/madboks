import * as z from 'zod'

export const items = z.object({
  barcode: z
    .string()
    .min(4, {
      message: 'Bar Code must be at least 4 numbers'
    })
    .optional()
    .or(z.literal('')),
  amount: z
    .coerce
    .number()
    .positive()
    .gte(1, {
      message: 'The minimum number of items must be 1'
    })
    .lte(30, {
      message: 'Are you sure that you want to add more than 30 items?'
    }),
  kg: z
    .coerce
    .number({
      invalid_type_error: "You must write the amount of kg",
    })
    .gt(0, {
      message: 'The minimum amount in kg is 0'
    })
    .lte(30, {
      message: 'Are you sure that you want to add more than 30 items?'
    }),
  vegetableId: z
    .string(),
  countryCode: z
    .string()
})
