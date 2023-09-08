import {createMovieValidator, updateMovieValidator} from "../validators/movie.validator.js"
import Movie from "../models/movie.model.js"
import User from "../models/user.model.js"
import { BadUserRequestError, NotFoundError } from "../error/error.js"
import { mongoIdValidator } from "../validators/mongoId.validator.js"

export default class MovieController {
  static async createMovie(req, res,){
      const {error } = createMovieValidator.validate(req.body)
      if(error) throw error
      const newMovie = await Movie.create(req.body)
      res.status(200).json({
      message: "Movie created successfully",
      status: "Success",
      data:{
        movie: newMovie
      }
    })
  }

  static async updateOneMovie(req, res){
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const updateValidatorResponse = await updateMovieValidator.validate(req.body)
    const updateMovieError = updateValidatorResponse.error
    if(updateMovieError) throw updateMovieError
    
    const movie = await Movie.findById(id)
    if(!movie) throw new NotFoundError(`The movie with this id: ${id}, does not exist`)

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true})
    return res.status(200).json({
      message: "Movie updated successfully",
      status: "Success",
      data:{
        movie: updatedMovie
      }
    })
  }



  static async getOneMovie(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const movie = await Movie.findById(id)
    if(!movie) throw new NotFoundError(`The movie with this id: ${id}, does not exist`)

    return res.status(200).json({
      message: "Task found successfully",
      status: "Success",
      data: {
        movie: movie
      }
    })
  }


  static async deleteOneMovie(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const move = await Movie.findById(id)
    if(!move) throw new NotFoundError(`The movie with this id: ${id}, does not exist`)

    await Movie.findByIdAndUpdate(id, {
      isDeleted: true
    })
    // await Task.findOneAndDelete()

    return res.status(200).json({
      message: "Movie deleted successfully",
      status: "Success",
    })
  }


  static async findAllMovies(req, res) {
    const id = req.user._id
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const user = await User.findById(id)
    if(!user) throw new NotFoundError(`The user with this id: ${id}, does not exist`)

    const movie =  await Movie.find({ creatorId: id }).populate("creator")

    return res.status(200).json({
      message: tasks.length < 1 ? "No movies found" : "Movies found successfully",
      status: "Success",
      data: {
        movie: movie
      }
    })
  }
}