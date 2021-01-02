import jwt from 'jsonwebtoken'

const Authentication = (req, res, next) => {
    try{
        const {headers: {authorization}} = req
        
        const [, token] = authorization.split(' ')
        console.log('AUTH MIDD', token)
    
        const secret = process.env.JWT_KEY
    
        if(!secret) throw new Error('Nenhuma key JWT configurada')
    
        jwt.verify(token, secret)
    
        next()
    }catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export default Authentication