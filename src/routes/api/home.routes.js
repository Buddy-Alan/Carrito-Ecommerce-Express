import { Router } from "express";
const home = Router()


home.get("/", (req, res) => {
    res.json({
        "Message:": "Bienvenido a la simulacion del ecommerce , para conocer  un poco mas de como funciona acceda al siguiente enlace",
        "Link": "https://github.com/Buddy-Alan/Carrito-Ecommerce-Express/#readme"
    })
})

export default home
