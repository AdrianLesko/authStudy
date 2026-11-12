import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function userRegister (req, res, next) {
  try {
    const {email, name, password} = req.body
    
    if (!email || !name || !password) {
      const err = new Error('Fill missing values')
      err.status = 400
      throw err
    }
    
    if (!email.trim() || !password.trim()) {
      const err = new Error('Email and Password must be in correct format')
      err.status = 400 
      throw err
    }

    if (!name.trim()) {
      const err = new Error('Fill the name with correct format')
      err.status = 400
      throw err 
    }

    if (password.length < 8){
      const err = new Error('Password length is minimum 8 characters.')
      err.status = 400 
      throw err
    }

    const user = await User.findOne({email})

    if (user) {
      const err = new Error('Email already exists, login to continue..')
      err.status = 409
      throw err
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    const newUser = new User({
      email,
      name,
      passwordHash
    })

    await newUser.save()

    res.status(201).json(newUser)

  } catch (err) {next(err)}
}

async function userLogin (req, res, next) { 
  try {
    const {email, password} = req.body
  
    if (!email || !password) {
      const err = new Error('You must provide email and password')
      err.status = 400
      throw err
    }

    const user = await User.findOne({email})

    if (!user) {
      const err = new Error ('Incorect email or password')
      err.status = 401
      throw err
    }

    const correctPassword = !password ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && correctPassword)) {
      const err = new Error ('Incorect email or password')
      err.status = 401
      throw err
    }

    const tokenForUser = {
      email: user.email, 
      id: user.id,
      name: user.name
    }

    const token = jwt.sign(tokenForUser, process.env.JWT_SECRET, {expiresIn: '2h'})

    res.status(200).json({token, user})
  } catch (err) {next(err)}
  
}
export { userRegister, userLogin }