import jwt from 'jsonwebtoken'

const getToken = (req) => {
  const authorization = req.get('authorization')
  if (authorization && /^Bearer /.test(authorization)){
    return authorization.split(" ")[1]
  }
  return null
} 


export function verifyToken (req,res,next) {
  try {
    const decoded = jwt.verify(getToken(req), process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    next(err)
  }
}

