import {Router} from 'express'

import Attribute from './AttributeModel'

const router = Router()

router.get('/', (req, res) => {
    Attribute.findAll().then(attributes => {
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

    Attribute.create({title})
        .then(() => res.status(200).json({
            success: true,
            message: 'Registro incluído com sucesso.'
        }))
        .catch(error => res.status(400).json({
            sucesso: false,
            mensagem: error.errors[0].message
        }))
})

export default router