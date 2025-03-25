import { Schema, model } from "mongoose";

const colourTheme = new Schema({
    themes:[{
        primary:{
            type:String,
            required: true,
        },
        secondary:{
            type:String,
            required: true,
        },
        accent:{
            type:String,
            required: true,
        },
        fontColour:{
            type:String,
            required: true,
        }
    }]
});

const ColourTheme = model("ColourTheme", colourTheme);

export default ColourTheme;