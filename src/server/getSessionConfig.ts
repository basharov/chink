import session from 'express-session'

export const getSessionConfig = () => {
    return session({
        secret: 'anything',
        resave: true,
        saveUninitialized: true
    })
}