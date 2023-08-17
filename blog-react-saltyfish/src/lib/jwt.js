const jwt = require('jsonwebtoken')
const tokenKey = process.env?.JWT_SECRET_KEY || 'JWT_SECRET_KEY'
const expiresTime = '1d'

const getToken = (userInfo) => {
  const token = jwt.sign(userInfo, tokenKey, { expiresIn: expiresTime })
  return token
}

const checkToken = (token) => {
  try{
    const decoded = jwt.verify(token, tokenKey)
    return decoded
  }
  catch(err){
    console.log('err---',err)
    return false
  }
}

module.exports = {
  getToken,
  checkToken
}