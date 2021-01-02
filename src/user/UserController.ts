import {Router} from 'express'
import bcrypt from 'bcrypt'
import knex from '../database'

const router = Router()

router.post('/new', async (req, res) => {
    const {email, password} = req.body

    try{        
        if(!email || !password) throw new Error('Email ou senha inválidos')
        
        const findedEmail = await knex('user').where({email})
        
        if(findedEmail.length > 0) throw new Error('Esse email já possui cadastro')
        
        
        const salt = 10
        const hashedPass = await bcrypt.hash(password, salt)

        knex.transaction(async trx => {
            await trx('user').insert({email, password: hashedPass})

            res.status(200).json({
                success: true,
                message: 'Cadastro realizado com sucesso.'
            })
        })
    }catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
})

router.put('/edit', (req, res) => {
    console.log('Editar')
})

router.delete('/delete', (req, res) => {
    console.log('Deletar')
})

export default router