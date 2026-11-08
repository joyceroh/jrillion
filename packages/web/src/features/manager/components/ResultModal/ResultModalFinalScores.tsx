import type { GameResultPlayer } from "@razzia/common/types/game"
import { Medal } from "lucide-react"
import { useTranslation } from "react-i18next"

const ResultModalFinalScores = ({
  players,
}: {
  players: GameResultPlayer[]
}) => {
  const { t } = useTranslation()

  return (
    <section className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
      <h3 className="text-foreground mb-4 flex items-center gap-2 text-base font-semibold">
        <Medal className="size-5" />
        {t("manager:result.finalScores")}
      </h3>
      {players.length > 0 ? (
        <ol className="divide-accent divide-y-2">
          {[...players]
            .sort((a, b) => a.rank - b.rank)
            .map((player) => (
              <li
                key={`${player.rank}-${player.username}`}
                className="flex items-center gap-3 py-3"
              >
                <span className="text-muted-foreground w-8 shrink-0 text-right text-sm font-semibold tabular-nums">
                  {player.rank}.
                </span>
                <span className="min-w-0 flex-1 truncate font-medium">
                  {player.username}
                </span>
                <span className="text-foreground shrink-0 font-semibold tabular-nums">
                  {player.points} {t("manager:result.table.points")}
                </span>
              </li>
            ))}
        </ol>
      ) : (
        <p className="text-muted-foreground text-sm">
          {t("manager:result.playerCount", { count: 0 })}
        </p>
      )}
    </section>
  )
}

export default ResultModalFinalScores
