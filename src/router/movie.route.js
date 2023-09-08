import {  Router } from "express"
import MovieController from "../controller/movie.controller.js"
import { tryCatchHandler} from "../utils/tryCatch.handler.js"
// import {userAuthMiddleWare} from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/create", tryCatchHandler( MovieController.createMovie))

router.put("/update", tryCatchHandler( MovieController.updateOneMovie))

router.get("/one", tryCatchHandler( MovieController.getOneMovie))

router.get("/", tryCatchHandler( MovieController.findAllMovies))

router.delete("/delete",  tryCatchHandler( MovieController.deleteOneMovie))

export { router }