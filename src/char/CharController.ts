import {Router} from 'express'
import Char from './CharModel'

const router = Router()

router.get('/', (req, res) => {
    Char.findAll().then(chars => {
        if(!chars) return res.status(400).json({
            data: [],
            success: false,
            message: 'Não foi possível realizar a busca.'
        })

        res.status(200).json({
            data: chars,
            success: true,
            message: ''
        })
    })
})

export default router