import type { GameResult } from "@razzia/common/types/game"
import ResultModalAnswers from "@razzia/web/features/manager/components/ResultModal/ResultModalAnswers"
import ResultModalFinalScores from "@razzia/web/features/manager/components/ResultModal/ResultModalFinalScores"
import ResultModalHeader from "@razzia/web/features/manager/components/ResultModal/ResultModalHeader"
import ResultModalStats from "@razzia/web/features/manager/components/ResultModal/ResultModalStats"
import ResultModalTable from "@razzia/web/features/manager/components/ResultModal/ResultModalTable"
import { ResultModalProvider } from "@razzia/web/features/manager/contexts/result-modal-context"
import { useEffect, useState } from "react"

interface Props {
  result: GameResult
  onClose: () => void
}

const ResultModal = ({ result, onClose }: Props) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const totalSlides = result.questions.length + 1

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-background flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl shadow-2xl">
        <ResultModalProvider
          result={result}
          onClose={onClose}
          slideIndex={slideIndex}
          goNext={() =>
            setSlideIndex((index) => Math.min(index + 1, totalSlides - 1))
          }
          goPrev={() => setSlideIndex((index) => Math.max(index - 1, 0))}
        >
          <ResultModalHeader />
          <ResultModalSlides
            isFinalScoresSlide={slideIndex === 0}
            players={result.players}
          />
        </ResultModalProvider>
      </div>
    </div>
  )
}

const ResultModalSlides = ({
  isFinalScoresSlide,
  players,
}: {
  isFinalScoresSlide: boolean
  players: GameResult["players"]
}) => {
  if (isFinalScoresSlide) {
    return <ResultModalFinalScores players={players} />
  }

  return (
    <>
      <ResultModalAnswers />
      <ResultModalStats />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ResultModalTable />
      </div>
    </>
  )
}

export default ResultModal
