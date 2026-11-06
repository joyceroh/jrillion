import type { ResponsesComponentProps } from "@razzia/web/features/questions/types"
import { useTranslation } from "react-i18next"

const TextResponses = ({
  data: { textResponses = [] },
}: ResponsesComponentProps) => {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 overflow-y-auto px-4">
      <p className="text-center text-lg font-semibold text-white">
        {t("game:textResponsesCount", { count: textResponses.length })}
      </p>
      {textResponses.map((response, index) => (
        <div
          key={`${index}-${response}`}
          className="break-words rounded-lg bg-white px-4 py-3 text-foreground shadow-md"
        >
          {response}
        </div>
      ))}
    </div>
  )
}

export default TextResponses
