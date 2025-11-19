import jwt from 'jsonwebtoken'
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
    console.error('err---', err)
    return {}
  }
}

const checkTokenRole = (token, userRole) => {
  try {
    const role = checkToken(token)?.userRole
    return role === userRole
  }
  catch (err) {
    console.error('err---', err)
    return false
  }
}

const checkTokenUserId = (token, uid) => {
  try {
    const id = checkToken(token)?.id
    return id == uid
  }
  catch (err) {
    console.error('err---', err)
    return false
  }
}

export {
  getToken,
  checkToken,
  checkTokenRole,
  checkTokenUserId
}