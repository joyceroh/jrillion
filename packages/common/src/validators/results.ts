import { z } from "zod"

export const updateResultPointsValidator = z
  .object({
    questionIndex: z.number().int().nonnegative(),
    playerAnswerIndex: z.number().int().nonnegative(),
    points: z.number().int(),
  })
  .strict()

export type UpdateResultPoints = z.infer<typeof updateResultPointsValidator>
