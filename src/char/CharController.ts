import {Router} from 'express'

import knex from '../database'

import {AttributeToCreate} from '../types/attribute'

const router = Router()

router.get('/', (req, res) => {
    knex.select().table('char').then(chars => {
        console.log('chars', chars)
        res.status(200).json({
            data: chars,
            success: true,
            message: ''
        })
    }).catch(error => res.status(400).json({
        data: [],
        success: false,
        message: error
    }))
})

router.post('/save', (req, res) => {
    const {
        name,
        gender,
        attributes,
    } = req.body

    console.log('TESTE', name,    gender,    attributes)

    const defaultResponse = {
        success: true,
        message: 'Personagem criado com sucesso!',
        attributeResponse: {
            success: true, message: 'Attributos registrados com sucesso!', sample: '',
        }
    }   

    if(attributes && attributes.length > 0)
        attributes.forEach((attribute: AttributeToCreate) => {
            if(typeof attribute !== 'object' || Array.isArray(attribute)) return res.status(400).json({
                ...defaultResponse,
                success: true,
                attributeResponse: {
                    ...defaultResponse.attributeResponse,
                    success: false,
                    message: 'Formato do attributo incorreto.',
                    sample: 'attributes: [{ attributeId: INTEGER, value: INTEGER }]',
                },
            })

            if(!attribute.attributeId) return res.status(400).json({
                ...defaultResponse,
                success: true,
                attributeResponse: {
                    ...defaultResponse.attributeResponse,
                    success: false,
                    message: 'O id do attributo é obrigatório!'
                },
            })
        })    

        knex.transaction(trx => {
            trx('char').insert({name, gender})
                .then(char => {        
                    attributes.forEach((attribute: AttributeToCreate) => {
                        const {attributeId, value} = attribute
                        
                        trx('char_attribute').insert({
                            charId: char[0],
                            attributeId,
                            value: value ? value : 0,
                        })
                        .then(() => {
                            trx.commit()
                            res.json(defaultResponse)
                        })
                        .catch(error => {
                                trx.rollback()
                                res.status(201).json({
                                ...defaultResponse,
                                success: true,
                                message: '',
                                attributeResponse: {
                                    ...defaultResponse.attributeResponse,
                                    success: false,
                                    message: error
                                }
                            })
                        })
                    })
                })
                .catch(error => res.status(400).json({
                    ...defaultResponse,
                    sucesso: false,
                    mensagem: error.errors[0].message,
                    attributeResponse: {
                        ...defaultResponse.attributeResponse,
                        success: false,
                        message: '',
                    },
                }))
        })
})

export default router