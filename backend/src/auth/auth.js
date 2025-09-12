import express from 'express'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import { Mongo } from '../database/mongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb' 

const collectionName = 'users'

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, callback) => {
    try {
        const user = await Mongo.db.collection(collectionName).findOne({ email: email })
        
        if(!user){
            return callback(null, false)
        }

        const saltBuffer = user.salt.buffer

        crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (err, hashedPassword) => {
            if (err) { return callback(err) }

            const userPasswordBuffer = user.password.buffer
            
            if(!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)) {
                return callback(null, false)
            }

            const { password, salt, ...rest } = user
            return callback(null, rest)
        })
    } catch (err) {
        return callback(err)
    }
}))


const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const checkUser = await Mongo.db
        .collection(collectionName)
        .findOne({ email: req.body.email })

    if(checkUser) {
        return res.status(409).send({
            success: false,
            statusCode: 409,
            body: {
                text: 'Este email já está em uso.'
            }
        })
    }

    const salt = crypto.randomBytes(16)
    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (err, hashedPassword) => {
        if (err) {
            return res.status(500).send({
                success: false,
                statusCode: 500,
                body: {
                    text: 'Erro ao processar a senha.'
                }
            })
        }

        const result = await Mongo.db
            .collection(collectionName)
            .insertOne({
                email: req.body.email,
                password: hashedPassword, 
                salt
            })

        if(result.insertedId) {
            const user = await Mongo.db
                .collection(collectionName)
                .findOne({ _id: new ObjectId(result.insertedId)})

            const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    
            const { password, salt, ...userResponse } = user

            return res.status(201).send({
                success: true,
                statusCode: 201,
                body: {
                    text: 'Usuário registrado com sucesso!',
                    token,
                    user: userResponse,
                    logged: true
                }
            })
        }
    })
})

authRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    const token = jwt.sign({ _id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).send({
        success: true,
        statusCode: 200,
        body: {
            text: 'Login bem-sucedido!',
            token,
            user: req.user,
            logged: true
        }
    })
})

export default authRouter