export const ok = (body) => {
    return {
        success: true,
        statusCode: 200,
        body: body
    };
};

export const created = (body) => {
    return {
        success: true,
        statusCode: 201,
        body: body
    };
};

export const notFound = () => {
    return {
        success: false,
        statusCode: 404, 
        body: { message: 'Recurso não encontrado.' }
    };
};

export const serverError = (error) => {
    return {
        success: false,
        statusCode: 500, 
        body: { message: error.message }
    };
};