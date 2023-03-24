import mongoose from "mongoose";
const cartCollections = "cart"


const cartSchema = new mongoose.Schema(

    {
        timestamp: {
            type: Date,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        products: [
            {
                _id: {
                    type: String,
                    require: true,
                },
                title: {
                    type: String,
                    require: true,
                    unique: true
                },
                price: {
                    type: Number,
                    require: true
                },
                descripcion: {
                    type: String,
                    require: true
                },
                stock: {
                    type: Number,
                    require: true
                },
                codigo: {
                    type: String,
                    require: true
                }
            }
        ]
    }

)

export const cartModels = mongoose.model(cartCollections, cartSchema)