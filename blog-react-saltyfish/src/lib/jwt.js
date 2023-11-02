const jwt = require('jsonwebtoken')
const tokenKey = process.env?.JWT_SECRET_KEY || 'JWT_SECRET_KEY'
const expiresTime = '1d'

const getToken = (userInfo) => {
  const token = jwt.sign(userInfo, tokenKey, { expiresIn: expiresTime })
  return token
}

const checkToken = (token) => {
  if (!token) {
    return {}
  }
  try {
    const decoded = jwt.verify(token, tokenKey)
    return decoded
  }
  catch (err) {
    console.log('err---', err)
    return {}
  }
}

const checkTokenRole = (token, userRole) => {
  try {
    const role = checkToken(token)?.userRole
    return role === userRole
  }
  catch (err) {
    console.log('err---', err)
    return false
  }
}

const checkTokenUserId = (token, uid) => {
  try {
    const id = checkToken(token)?.id
    return id == uid
  }
  catch (err) {
    console.log('err---', err)
    return false
  }
}

module.exports = {
  getToken,
  checkToken,
  checkTokenRole,
  checkTokenUserId
}