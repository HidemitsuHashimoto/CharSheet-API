import {Router} from 'express'

import knex from '../database'

const router = Router()

router.get('/', (req, res) => {
    knex.select().table('attribute')
    .then(attributes => {
        if(!attributes) return res.status(400).json({
            data: [],
            success: false,
            message: 'Não foi possível realizar a busca.'
        })

        res.status(200).json({
            data: attributes,
            success: true,
            message: ''
        })
    })
})

router.post('/save', (req, res) => {
    const {title} = req.body

    knex('attribute').insert({title})
        .then(() => res.status(200).json({
            success: true,
            message: 'Registro incluído com sucesso.'
        }))
        .catch(error => res.status(400).json({
            success: false,
            message: error
        }))
})

export default router