import { Schema, model, Types, Query} from "mongoose"


const MovieSchema = new Schema({
  creator: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  cast: {
    type: String,
    required: true
  },
  plot: {
    type: String,
    required: true
  },
},{
  timestamps: true
})

MovieSchema.pre(/^find/, (next)=>{
  if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } }); 
  }
})

export default model('Movie', MovieSchema)