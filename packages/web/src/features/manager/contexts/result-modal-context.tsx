import type { GameResult, QuestionResult } from "@razzia/common/types/game"
import { isAnswerCorrect } from "@razzia/web/features/questions/utils"
import { createContext, useContext, type PropsWithChildren } from "react"

interface ResultModalContextType {
  result: GameResult
  questionResult: QuestionResult
  slideIndex: number
  questionIndex: number
  totalSlides: number
  isFinalScoresSlide: boolean
  totalPlayers: number
  answeredCount: number
  correctCount: number
  correctPct: number
  maxAnswerCount: number
  getPlayerPoints: (_name: string) => number
  goNext: () => void
  goPrev: () => void
  onClose: () => void
}

const ResultModalContext = createContext<ResultModalContextType | null>(null)

type Props = PropsWithChildren<{
  result: GameResult
  onClose: () => void
  slideIndex: number
  goNext: () => void
  goPrev: () => void
}>

export const ResultModalProvider = ({
  children,
  result,
  onClose,
  slideIndex,
  goNext,
  goPrev,
}: Props) => {
  const totalSlides = result.questions.length + 1
  const isFinalScoresSlide = slideIndex === 0
  const questionIndex = Math.max(0, slideIndex - 1)
  const questionResult = result.questions[questionIndex]
  const totalPlayers = result.players.length

  const answeredCount = questionResult.playerAnswers.filter(
    (pa) => pa.answerIds !== null && pa.answerIds.length > 0,
  ).length

  const correctCount = questionResult.playerAnswers.filter(
    (pa) => pa.correct ?? isAnswerCorrect(questionResult, pa.answerIds),
  ).length

  const correctPct =
    totalPlayers > 0 ? Math.round((correctCount / totalPlayers) * 100) : 0

  const maxAnswerCount = Math.max(
    1,
    ...questionResult.answers.map(
      (_, ai) =>
        questionResult.playerAnswers.filter(
          (pa) => Array.isArray(pa.answerIds) && pa.answerIds.includes(ai),
        ).length,
    ),
  )

  const getPlayerPoints = (name: string) =>
    result.players.find((p) => p.username === name)?.points ?? 0

  return (
    <ResultModalContext.Provider
      value={{
        result,
        questionResult,
        slideIndex,
        questionIndex,
        totalSlides,
        isFinalScoresSlide,
        totalPlayers,
        answeredCount,
        correctCount,
        correctPct,
        maxAnswerCount,
        getPlayerPoints,
        goNext,
        goPrev,
        onClose,
      }}
    >
      {children}
    </ResultModalContext.Provider>
  )
}

export const useResultModal = () => {
  const ctx = useContext(ResultModalContext)

  if (!ctx) {
    throw new Error("useResultModal must be used inside ResultModalProvider")
  }

  return ctx
}
