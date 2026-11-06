import {
  MAX_POINTS,
  MAX_TEXT_ANSWER_LENGTH,
} from "@razzia/common/constants"
import type { QuestionRefinement } from "@razzia/common/validators/questions"
import { z } from "zod"

export const textAnswersValidator = z.array(
  z.object({
    text: z
      .string()
      .min(1, "errors:quizz.answerEmpty")
      .max(MAX_TEXT_ANSWER_LENGTH)
      .refine((text) => text.trim().length > 0, "errors:quizz.answerEmpty"),
    points: z.number().int().min(0).max(MAX_POINTS),
  }),
)

export const refineTextQuestion: QuestionRefinement = (
  { textAnswers },
  addIssue,
) => {
  const seen = new Set<string>()

  textAnswers?.forEach(({ text }, index) => {
    const normalized = text.trim().toLowerCase()

    if (seen.has(normalized)) {
      addIssue(["textAnswers", index, "text"], "errors:quizz.answerEmpty")
    }

    seen.add(normalized)
  })
}
