module.exports = values = {
    httpStatus : {
        success : 200,
        notFound : 404,
        internalError : 500,
        created : 201,
        badRequest : 400,
        unAuthorized : 401,
    },
    roles : {
        admin : 1,
        user : 0
    },
    projectTypeField : {
        emergency : 'emergency',
        normal : 'normal',
        notImportant:'not important'
    },
    projectStatus : {
        thereIsADeadLine : 'There is a deadline' ,
        deadLineHasExpired : 'Deadline has expired'
    }
}
