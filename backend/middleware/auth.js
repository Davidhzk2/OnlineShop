const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    let jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(400).send("Autorizacion Rechazada: no hay token");
    
    jwtToken = jwtToken.split(" ")[1];

    if(!jwtToken) return res.status(400).send("Autorizacion Rechazada: no hay token.");
    try {
        const payload = await jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
        req.user = payload;
        next();
    } catch (error) {
         return res.status(400).send("Autorizacion rechazada: el token no es valido.");
    }
};

module.exports = auth;