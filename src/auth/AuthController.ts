import {Router} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import knex from '../database'

const router = Router()

router.post('/', async (req, res) => {
    const {email, password} = req.body

    try{
        const findedUser = await knex('user').select().where({email})

        if(findedUser.length === 0) throw new Error('Nenhum cadastro encontado')

        const comparedPass = await bcrypt.compare(password, findedUser[0].password)

        if (!comparedPass) throw new Error('Email ou senha incorretos')

        const secret = process.env.JWT_KEY

        if(!secret) throw new Error('Nenhuma key JWT configurada')

        const token = jwt.sign({
            email: findedUser[0].email,
            password: findedUser[0].password
        }, secret, {expiresIn: '1d'})

        res.status(200).json({
            success: true,
            message: 'Autenticação realizada com sucesso',
            token
        })
    }catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }

})

export default router