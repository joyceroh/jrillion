import type { PreparedComponentProps } from "@razzia/web/features/questions/types"
import { MessageSquareText } from "lucide-react"

const TextPrepared = (_props: PreparedComponentProps) => (
  <div className="anim-quizz flex size-60 items-center justify-center rounded-2xl bg-gray-700">
    <MessageSquareText className="size-24 text-white" />
  </div>
)

export default TextPrepared
