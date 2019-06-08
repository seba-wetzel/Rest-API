const services = require('../services/index')


const isAuth = (req, res, next)=>{
    if(!req.headers.authorization) return res.status(403).send({messages: 'No tienes permisos'}).end();
    const token = req.headers.authorization.split(" ")[1];

    services.decodeToken(token)
    .then(responce=>{
        req.user = responce;
        next();
    })
    .catch(responce=>{
        res.status(responce.status);
    })
    req.user = payload.sub;
    next();
}

module.exports = isAuth;