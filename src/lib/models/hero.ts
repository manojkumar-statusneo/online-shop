import { Schema, model, models } from "mongoose";

const HeroSchema = new Schema(
    {
        title: {type:String},
        image:{type:String},
      })

      const Hero = models.Hero || model("Hero", HeroSchema);

export default Hero;