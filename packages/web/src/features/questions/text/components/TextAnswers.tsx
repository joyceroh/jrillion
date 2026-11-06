import { MAX_TEXT_ANSWER_LENGTH } from "@razzia/common/constants"
import Button from "@razzia/web/components/Button"
import Input from "@razzia/web/components/Input"
import type { AnswerComponentProps } from "@razzia/web/features/questions/types"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const TextAnswers = ({ onSubmit, readOnly, fill }: AnswerComponentProps) => {
  const [answer, setAnswer] = useState("")
  const { t } = useTranslation()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()

        if (answer.trim()) {
          onSubmit(answer)
        }
      }}
      className={`mx-auto mb-4 flex w-full max-w-2xl flex-col gap-3 px-2 ${
        fill ? "flex-1 justify-center" : ""
      }`}
    >
      <Input
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        maxLength={MAX_TEXT_ANSWER_LENGTH}
        placeholder={t("game:textAnswerPlaceholder")}
        disabled={readOnly}
        autoFocus={!readOnly}
        className="bg-white shadow-md"
      />
      {!readOnly && (
        <>
          <span className="text-right text-sm text-white/80">
            {t("game:textAnswerCharacters", { count: answer.length })}
          </span>
          <Button
            type="submit"
            disabled={!answer.trim()}
            className="mx-auto w-full max-w-xs shadow-md"
          >
            {t("game:confirm")}
          </Button>
        </>
      )}
    </form>
  )
}

export default TextAnswers
