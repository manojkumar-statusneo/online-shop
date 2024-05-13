import { Schema, model, models } from "mongoose";

const CatSchema = new Schema(
    {
        name: {type:String,required:true},
        parent: {type:Schema.Types.ObjectId, ref:'Category'},
        properties: [{type:Object}],
        image:{type:String},
      })
      const Category = models.Category || model("Category", CatSchema);

export default Category;