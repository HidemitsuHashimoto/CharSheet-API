const Authentication = (req, res, next) => {
    const {headers: {authorization}} = req
    console.log('AUTH MIDD', authorization)
}

export default Authentication