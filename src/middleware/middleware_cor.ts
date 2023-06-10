const middleware = require('src/middleware/middleware_jwt');

export const tokeJwtFilter = [
    middleware.checkHeader,
    middleware.checkToken,
    middleware.verifyAndAuthenticate,
    middleware.checkJwtPayload
];