import {Router} from 'express'

import knex from '../database'

const router = Router()

router.get('/', async (req, res) => {
    try{
        const attributes = await knex.select().table('attribute')    

        res.status(200).json({
            data: attributes,
            success: true,
            message: ''
        })
    }catch(e) {
        res.status(400).json({
            data: [],
            success: false,
            message: 'Não foi possível realizar a busca.'
        })
    }
})

router.post('/save', async (req, res) => {    
    try{
        const {title} = req.body
    
        await knex('attribute').insert({title})

        res.status(200).json({
            success: true,
            message: 'Registro incluído com sucesso.'
        })
    }catch(e) {
        res.status(400).json({
            success: false,
            message: e
        })
    }
})

export default router