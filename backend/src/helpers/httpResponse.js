export const ok = (body) => {
    return {
        success: true,
        statuscode: 200, 
        body: body
    }
}

export const notFound = () => {
    return {
        success: false,
        statuscode: 404, 
        body: 'Not Found'
    }
}

export const serverError = (error) => { 
    return {
        success: false,
        statuscode: 500, 
        body: error.message 
    }
}