import mongoose from "mongoose";
const usersCollections = "users"
const usersSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        edad: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    }

)

export const userModels = mongoose.model(usersCollections, usersSchema)