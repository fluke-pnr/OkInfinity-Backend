import { Router } from "express"
import PostRoute from "./post"
import PageRoute from "./page"

export default () => {
  const route = Router()
  route.get("/", (_, res) =>
    res.json({ message: "OK INFINITY BACKEND IS RUNNING ON API V1" })
  )

  route.use('/insert',PageRoute, PostRoute);
  route.use('/page',PageRoute);
  return route
}
