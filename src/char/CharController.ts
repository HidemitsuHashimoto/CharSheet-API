import {Router} from 'express'
import database from 'database'

const router = Router()

router.get('/', (req, res) => res.json({
    teste: 'TESTE DE ROTA CHAR'
}))

export default router