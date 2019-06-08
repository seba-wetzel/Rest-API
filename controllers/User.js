const mongoose = require('mongoose')
const User = require('../schemas/userSchema');
const service = require('../services/index');

const signIn = (req, res)=>{
    User.find({email: req.body.email}, (err, user)=>{
        if(err) return res.status(500).send({message: err});
        if(!user) return res.status(404).send({message: `${req.body.email} no encontrado`});
        req.user = user
    })

}

const signUp = (req, res)=>{
    const {email, displayName,} = req.body;
    const user = new User({
        email,displayName
    })
    user.save((err, user) => {
        if (err) return res.status(500).send({message: `error al crear el usuario: ${user}`}).end();
        else res.status(200).send({ token: ServiceUIFrameContext.createToken(user) }).end(); 
    })

}

module.exports = {
    signUp,
    signIn
}