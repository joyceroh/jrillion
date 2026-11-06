import {
  MAX_POINTS,
  MAX_TEXT_ANSWER_LENGTH,
} from "@razzia/common/constants"
import { useQuizzEditor } from "@razzia/web/features/quizz/contexts/quizz-editor-context"
import { Minus, Plus } from "lucide-react"

const TextAnswersEditor = () => {
  const { currentQuestion, currentIndex, updateQuestion } = useQuizzEditor()
  const textAnswers = currentQuestion.textAnswers ?? []

  const updateAnswer = (
    index: number,
    updates: Partial<(typeof textAnswers)[number]>,
  ) => {
    updateQuestion(currentIndex, {
      textAnswers: textAnswers.map((answer, answerIndex) =>
        answerIndex === index ? { ...answer, ...updates } : answer,
      ),
    })
  }

  const addAnswer = () => {
    updateQuestion(currentIndex, {
      textAnswers: [...textAnswers, { text: "", points: 0 }],
    })
  }

  const removeAnswer = (index: number) => {
    updateQuestion(currentIndex, {
      textAnswers: textAnswers.filter((_, answerIndex) => answerIndex !== index),
    })
  }

  return (
    <section className="z-10 flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-muted-foreground text-sm font-semibold">
          Accepted answers and points
        </h3>
        <button
          type="button"
          onClick={addAnswer}
          className="bg-accent text-accent-foreground flex size-7 items-center justify-center rounded-lg"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {textAnswers.map((answer, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={answer.text}
            onChange={(event) => updateAnswer(index, { text: event.target.value })}
            maxLength={MAX_TEXT_ANSWER_LENGTH}
            placeholder="Accepted answer"
            className="bg-background border-accent min-w-0 flex-1 rounded-lg border-2 p-2"
          />
          <input
            type="number"
            min={0}
            max={MAX_POINTS}
            step={1}
            value={answer.points}
            onChange={(event) =>
              updateAnswer(index, { points: Number(event.target.value) || 0 })
            }
            className="bg-background border-accent w-24 rounded-lg border-2 p-2"
          />
          <button
            type="button"
            onClick={() => removeAnswer(index)}
            className="bg-accent text-accent-foreground flex size-7 shrink-0 items-center justify-center rounded-lg"
          >
            <Minus className="size-4" />
          </button>
        </div>
      ))}
    </section>
  )
}

export default TextAnswersEditor
