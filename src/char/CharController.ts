import {Router} from 'express'

import knex from '../database'

import {AttributeToCreate} from '../types/attribute'

const router = Router()

router.get('/', async (req, res) => {
    try{
        const chars = await knex('char').select()

        const newChars = await Promise.all(chars.map(async char => {
            const attributes = await knex('char_attribute')
                .select(['char_attribute.id as id', 'attribute.id as attributeId', 'value', 'title'])
                .innerJoin('attribute', 'attribute.id', 'char_attribute.attributeId')
                .where({
                    charId: char.id
                })
            return {...char, attributes}
        }))
        
        res.status(200).json({
            data: newChars,
            success: true,
            message: 'Consulta realizada com sucesso.'
        })
    }catch(e) {
        res.status(400).json({
            data: [],
            success: false,
            message: e
        })
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params

    try{
        const char = await knex('char').select().where({id})
        const attributes = await knex('char_attribute')
            .select(['char_attribute.id as id', 'attribute.id as attributeId', 'value', 'title'])
            .innerJoin('attribute', 'attribute.id', 'char_attribute.attributeId')
            .where({charId: id})

        res.status(200).json({
            data: {...char[0], attributes},
            success: true,
            message: 'Personagem encontrado com sucesso.'
        })
    }catch(e) {
        res.status(400).json({
            data: {},
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
        mensagem: 'Personagem criado com sucesso!',
        attributeResponse: {
            success: true, mensagem: 'Attributos registrados com sucesso!', sample: '',
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
                    mensagem: 'Formato do attributo incorreto.',
                    sample: 'attributes: [{ attributeId: INTEGER, value: INTEGER }]',
                },
            })

            if(!attribute.attributeId) return res.status(400).json({
                ...defaultResponse,
                success: true,
                attributeResponse: {
                    ...defaultResponse.attributeResponse,
                    success: false,
                    mensagem: 'O id do attributo é obrigatório!'
                },
            })
        })

        knex.transaction(async trx => {
            try{
                const char = await trx('char').insert({name, gender})
                const allAttributes = await trx('attribute').select().pluck('id')
                
                const newAttributes = allAttributes.map((attributeId: number) => {
                    const filteredAttribute = attributes ? attributes.find((attribute: AttributeToCreate) => attribute.attributeId === attributeId) : false

                    if(!filteredAttribute)
                        return {
                            charId: char[0],
                            attributeId,
                            value: 0,
                        }
                        
                    return {
                        charId: char[0],
                        attributeId: filteredAttribute.attributeId,
                        value: filteredAttribute.value ? filteredAttribute.value : 0,
                    }
                })

                const teste = await trx('char_attribute').insert(newAttributes)
                
                res.json(defaultResponse)
            }catch(e) {
                res.status(400).json({
                    ...defaultResponse,
                    sucesso: false,
                    mensagem: e,
                    attributeResponse: {
                        ...defaultResponse.attributeResponse,
                        success: false,
                        mensagem: '',
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
        mensagem: 'Personagem atualizado com sucesso!',
        attributeResponse: {
            success: true, mensagem: 'Attributos atualizados com sucesso!', sample: '',
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
                    mensagem: 'Formato do attributo incorreto.',
                    sample: 'attributes: [{ attributeId: INTEGER, value: INTEGER }]',
                },
            })

            if(!attribute.id) return res.status(400).json({
                ...defaultResponse,
                success: true,
                attributeResponse: {
                    ...defaultResponse.attributeResponse,
                    success: false,
                    mensagem: 'O id do attributo é obrigatório!'
                },
            })
        })

        knex.transaction(async trx => {
            try{
                const searchedChar = await trx('char').select().where({id})

                if(!searchedChar.length)
                    throw 'O personagem escolhido não existe!'

                await trx('char').where({id}).update({name, gender})
                
                if(attributes) {
                    const newAttributes = attributes.map(async (attribute: AttributeToCreate) => {
                        const {id: charAttId, attributeId, value} = attribute  
    
                        const newValue = value ? value : 0    
    
                        if(!charAttId)
                            return await knex('char_attribute')
                                .insert({
                                    charId: id,
                                    attributeId,
                                    value: newValue
                                }).transacting(trx)

                        const searchedAttribute = await knex('char_attribute')
                            .select(['charId', 'attributeId'])
                            .where({id: charAttId})

                        if(!searchedAttribute.length)
                            return await knex('char_attribute')
                                .insert({
                                    charId: id,
                                    attributeId,
                                    value: newValue
                                }).transacting(trx)

                        const filteredAttribute = searchedAttribute.find(attribute => {
                            const {charId, attributeId: attributeIdFilter} = attribute
                            return charId === id && attributeIdFilter === attributeId
                        })

                        if(!filteredAttribute)
                            throw 'O id do atributo escolhido pertence a outro personagem!'
    
                        return await knex('char_attribute')
                            .where({id: charAttId})
                            .update({value: newValue})
                            .transacting(trx)
                    })
    
                    await Promise.all(newAttributes)
                }
                
                res.json(defaultResponse)
            }catch(e) {
                res.status(400).json({
                    ...defaultResponse,
                    sucesso: false,
                    mensagem: e,
                    attributeResponse: {
                        ...defaultResponse.attributeResponse,
                        success: false,
                        mensagem: '',
                    },
                })
            }            
        })
})

export default router