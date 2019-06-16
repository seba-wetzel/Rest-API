'use strict'

const {decodeToken} = require('../services')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  const token = req.headers.authorization.split(' ')[1]

  decodeToken(token)
    .then(response => {
      console.log(`token decodificado correctamente: ${response}`)
      req.user = response
      next()
    })
    .catch(response => {
      console.log(`Error al decodficar token ${response.msg}`)
      res.status(response.status).send(response.msg).end();
    })
}

module.exports = isAuth