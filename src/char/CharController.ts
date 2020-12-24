import {Router} from 'express'

import knex from '../database'

import {AttributeToCreate} from '../types/attribute'

const router = Router()

router.get('/', async (req, res) => {
    try{
        const chars = await knex('char').select()

        const newChars = await Promise.all(chars.map(async char => {
            const attributes = await knex('char_attribute')
                .select()
                .innerJoin('attribute', 'attribute.id', 'char_attribute.attributeId')
                .where({
                    charId: char.id
                })
            return {...char, attributes}
        }))
        
        res.status(200).json({
            data: newChars,
            success: true,
            message: ''
        })
    }catch(e) {
        res.status(400).json({
            data: [],
            success: false,
            message: e
        })
    }
})

router.post('/save', (req, res) => {
    const {
        name,
        gender,
        attributes,
    } = req.body

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

        knex.transaction(async trx => {
            try{
                const char = await trx('char').insert({name, gender})
                
                const newAttributes = attributes.map((attribute: AttributeToCreate) => {
                    const {attributeId, value} = attribute            
                    return {
                        charId: char[0],
                        attributeId,
                        value: value ? value : 0,
                    }    
                })
                await trx('char_attribute').insert(newAttributes)
                
                res.json(defaultResponse)
            }catch(e) {
                trx.rollback()
                res.status(400).json({
                    ...defaultResponse,
                    sucesso: false,
                    mensagem: e.errors[0].message,
                    attributeResponse: {
                        ...defaultResponse.attributeResponse,
                        success: false,
                        message: '',
                    },
                })
            }            
        })
})

router.put('/edit', (req, res) => {
    const {
        id,
        name,
        gender,
        attributes,
    } = req.body

    const defaultResponse = {
        success: true,
        message: 'Personagem atualizado com sucesso!',
        attributeResponse: {
            success: true, message: 'Attributos atualizados com sucesso!', sample: '',
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

            if(!attribute.id) return res.status(400).json({
                ...defaultResponse,
                success: true,
                attributeResponse: {
                    ...defaultResponse.attributeResponse,
                    success: false,
                    message: 'O id do attributo é obrigatório!'
                },
            })
        })

        knex.transaction(async trx => {
            try{
                await trx('char')
                    .where({id})
                    .update({name, gender})
                
                const newAttributes = attributes.map(async (attribute: AttributeToCreate) => {
                    const {id: charAttId, value} = attribute  

                    const newValue = value ? value : 0    

                    await knex('char_attribute')
                        .where({id: charAttId})
                        .update({value: newValue})
                        .transacting(trx)
                })

                await Promise.all(newAttributes)
                
                res.json(defaultResponse)
            }catch(e) {
                trx.rollback()
                res.status(400).json({
                    ...defaultResponse,
                    sucesso: false,
                    mensagem: e.errors[0].message,
                    attributeResponse: {
                        ...defaultResponse.attributeResponse,
                        success: false,
                        message: '',
                    },
                })
            }            
        })
})

export default router