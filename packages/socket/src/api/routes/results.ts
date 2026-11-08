import { zValidator } from "@hono/zod-validator"
import { updateResultPointsValidator } from "@razzia/common/validators/results"
import { apiFactory } from "@razzia/socket/api/factory"
import { requireManager } from "@razzia/socket/api/middleware"
import { i18nHook } from "@razzia/socket/api/validation"
import {
  deleteResult,
  getResultById,
  getResultsMeta,
  updateResultPoints,
} from "@razzia/socket/services/config"
import { StatusCodes } from "http-status-codes"

const routes = apiFactory
  .createApp()
  .use(requireManager)
  .get("/", (c) => c.json({ results: getResultsMeta() }))
  .get("/:id", (c) => c.json(getResultById(c.req.param("id"))))
  .patch(
    "/:id/points",
    zValidator("json", updateResultPointsValidator, i18nHook),
    (c) => c.json(updateResultPoints(c.req.param("id"), c.req.valid("json"))),
  )
  .delete("/:id", (c) => {
    deleteResult(c.req.param("id"))

    return c.body(null, StatusCodes.NO_CONTENT)
  })

export const results = routes
