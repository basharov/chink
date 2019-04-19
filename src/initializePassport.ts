import passport = require('passport')
import { getGithubStrategy } from './passportStrategies/getGithubStrategy'

export const initializePassport = () => {
    passport.use(getGithubStrategy())
    // passport.use(getGitlabStrategy())

    passport.serializeUser((user, cb) => {
        cb(null, user)
    })

    passport.deserializeUser((obj, cb) => {
        cb(null, obj)
    })

    return passport
}