import Joi from "joi"
import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)

export const createMovieValidator = Joi.object({
  //creator: Joi.objectId().required(),
  //creatorId: Joi.objectId().required(),
  title: Joi.string().required(),
  year: Joi.number().integer().required(),
  cast: Joi.string().required(),
  plot: Joi.string().required(),
}).strict()


export const updateMovieValidator = Joi.object({
  //creator: Joi.objectId().required(),
  //creatorId: Joi.objectId().required(),
  title: Joi.string().optional(),
  year: Joi.number().integer().optional(),
  cast: Joi.string().optional(),
  plot: Joi.string().optional(),
}).strict()