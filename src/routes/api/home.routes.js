import { Router } from "express";
const home = Router()


home.get("/", (req, res) => {

    res.json({ "Message:": "Bienvenido a la simulacion del ecommerce" })
})

export default home