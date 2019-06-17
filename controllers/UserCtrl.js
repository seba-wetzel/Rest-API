const mongoose = require('mongoose')
const User = require('../schemas/userSchema');
const service = require('../services/index');


const signIn = (req, res) => { 
    User.findOne({ email: req.body.email }, (err, user) => { 
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` }) 
        if (!user) return res.status(404).send({ msg: `no existe el usuario: ${req.body.email}` }) 
        user.comparePassword(req.body.password, (err, isMatch) => { 
            if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` }) 
            if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
            user.lastLogin = Date.now();
            user.save((err, user)=> console.log(user)); 
            req.user = user 
            return res.status(200).send({ msg: 'Te has logueado correctamente', token: service.createToken(user) }) 
        }); 
    }).select('_id email +password'); 
} 


const signUp = (req, res)=>{
    const {email, displayName, password} = req.body;
    const user = new User({
        email,
        displayName, 
        password
    })
    user.avatar = user.gravatar(); 
    user.save((err, user) => {
        if (err) return res.status(500).send({message: `error al crear el usuario: ${err}`}).end();
        else res.status(200).send({ msg:`Usuario creado ${user.displayName}`}).end(); 
    })

}

module.exports = {
    signUp,
    signIn
}