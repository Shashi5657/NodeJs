const errorMiddleWare = (err, req, res, next)=> {
    try {
        let error = {...er}

        error.message = err.message
        console.error(err)

        if(err.name === 'CastError'){
            const message = 'Resource not Found'
            error = new Error(message)
            error.statusCode = 404
        }

        if(error.code === 11000){
            const message = 'Duplicate field value entered'
            error = new Error(message)
            error.statusCode = 400
        }
    } catch (error) {
        next(error)
    }
}