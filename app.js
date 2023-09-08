import express  from "express";
import dotenv  from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import {globalErrorHandler} from "./src/utils/errorHandler.js"

// Importing the User Routes
import {router as userRouter} from "./src/router/user.route.js"
import {router as movieRouter} from "./src/router/movie.route.js"

// Creating the express app
const app = express()

// Exposing environment variables
dotenv.config()

// Database connection
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=> console.log("Database connection established")).catch(e=> console.log(e.message))


// Port configuration
const port = Number(process.env.PORT) || 3000;

// Middlewares
app.use(morgan('tiny'))
app.use(express.json())

// Routes 
app.use('/api/v1/user', userRouter)
app.use('/api/v1/movies', movieRouter)

app.use(globalErrorHandler)

// Setting up the express server
app.listen(port, ()=>{
  console.log(`Server runnning on port: ${port}`)
})