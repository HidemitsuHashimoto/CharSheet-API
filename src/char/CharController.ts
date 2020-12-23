import {Router} from 'express'

import Char from './CharModel'
import Attribute from '../attributes/AttributeModel'
import CharAttribute from '../associations/CharAttribute'

import {AttributeToCreate} from '../types/attribute'

const router = Router()

router.get('/', (req, res) => {
    Char.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: Attribute,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            through: {
                attributes: ['value']
            }
        }
    }).then(chars => {
        chars.map(teste => console.log('TESTE', teste.dataValues))
        res.status(200).json({
            data: chars.map(char => ({
                ...char.dataValues,
                attributes: char.attributes.map(attribute => {
                    const {char_attribute: {value}, dataValues: {char_attribute, ...rest}} = attribute
                    return {...rest, value}
                })
            })),
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

    Char.create({name, gender})
        .then(char => {
            if(!char) return res.status(400).json({
                ...defaultResponse,
                success: false,
                message: 'Não foi possível realizar a criação do personagem.',
            })

            attributes.forEach((attribute: AttributeToCreate) => {
                const {attributeId, value} = attribute
                
                CharAttribute.create({
                    charId: char.id,
                    attributeId,
                    value: value ? value : 0,
                })
                .then(() => res.json(defaultResponse))
                .catch(error => res.status(201).json({
                    ...defaultResponse,
                    success: true,
                    message: '',
                    attributeResponse: {
                        ...defaultResponse.attributeResponse,
                        success: false,
                        message: error
                    }
                }))
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

export default router