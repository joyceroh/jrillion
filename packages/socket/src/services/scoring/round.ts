import { QUESTION_TYPES } from "@razzia/common/constants"
import type { Answer, Player, Question } from "@razzia/common/types/game"
import { QUESTION_SCORING } from "@razzia/socket/services/scoring"

export type ScoredPlayer = Player & {
  lastCorrect: boolean
  lastPoints: number
}

const normalizeTextAnswer = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim()

export const countAnswers = (answers: Answer[]): Record<number, number> => {
  const answerIds = answers.flatMap((answer) =>
    Array.isArray(answer.answerIds) ? answer.answerIds : [],
  )

  return answerIds.reduce<Record<number, number>>((acc, id) => {
    acc[id] = (acc[id] ?? 0) + 1

    return acc
  }, {})
}

export const scoreQuestion = (
  question: Question,
  players: Player[],
  answers: Answer[],
): ScoredPlayer[] => {
  const scored = players.map((player) => {
    const playerAnswer = answers.find((a) => a.playerId === player.id)

    const submittedText =
      typeof playerAnswer?.answerIds === "string"
        ? playerAnswer.answerIds
        : undefined
    const normalizedSubmittedText =
      submittedText === undefined ? undefined : normalizeTextAnswer(submittedText)
    const matchedTextAnswer =
      question.type === QUESTION_TYPES.TEXT && normalizedSubmittedText !== undefined
        ? question.textAnswers?.find(({ text }) => {
            const normalizedAnswer = normalizeTextAnswer(text)

            return (
              normalizedAnswer.length > 0 &&
              normalizedSubmittedText.includes(normalizedAnswer)
            )
          })
        : undefined

    const scoreMultiplier = (() => {
      if (!playerAnswer) {
        return 0
      }

      if (question.type === QUESTION_TYPES.TEXT) {
        return 0
      }

      if (!Array.isArray(playerAnswer.answerIds)) {
        return 0
      }

      const scoring = QUESTION_SCORING[question.type]

      return scoring(question, playerAnswer.answerIds)
    })()

    const isCorrect =
      question.type === QUESTION_TYPES.TEXT
        ? matchedTextAnswer !== undefined
        : scoreMultiplier > 0
    const points =
      question.type === QUESTION_TYPES.TEXT
        ? (matchedTextAnswer?.points ?? 0)
        : Math.round((playerAnswer?.points ?? 0) * scoreMultiplier)
    const penalty = !isCorrect && playerAnswer ? (question.penalty ?? 0) : 0

    player.points = Math.max(0, player.points + points - penalty)
    player.streak = isCorrect ? player.streak + 1 : 0

    return {
      ...player,
      lastCorrect: isCorrect,
      lastPoints: isCorrect ? points : -penalty,
    }
  })

  return scored.sort((a, b) => b.points - a.points)
}
