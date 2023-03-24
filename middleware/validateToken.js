import jwt from "jsonwebtoken"

export const validateToken = (req,res,next) =>
{   
    const accesToken = req.header('authorization')
    if (!accesToken) res.send("Inicie sesion")
    jwt.verify(accesToken, "clave",(err,user) => 
    {
        if (err) {
            res.send ("Token incorrecto")
        }else{
            req.user = user
            next()
        }
    })
}