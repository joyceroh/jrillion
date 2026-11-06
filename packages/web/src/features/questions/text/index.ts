import { QUESTION_TYPES } from "@razzia/common/constants"
import type { Question } from "@razzia/common/types/game"

export { default as AnswerComponent } from "@razzia/web/features/questions/text/components/TextAnswers"

export { default as AnswersEditor } from "@razzia/web/features/questions/text/components/TextAnswersEditor"

export { default as ConfigComponent } from "@razzia/web/features/questions/single/components/SingleConfig"

export { default as PreparedComponent } from "@razzia/web/features/questions/text/components/TextPrepared"

export { default as ResponsesComponent } from "@razzia/web/features/questions/text/components/TextResponses"

export const type = QUESTION_TYPES.TEXT

export const labelKey = "quizz:questionType.text"

export const initialValues = (_question: Question): Partial<Question> => ({
  answers: [],
  textAnswers: _question.textAnswers?.length
    ? _question.textAnswers
    : [{ text: "", points: 0 }],
  solutions: undefined,
  options: undefined,
  maxPoints: undefined,
  penalty: undefined,
})
