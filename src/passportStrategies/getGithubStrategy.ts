import { updateUserProfile } from '../db/updateUserProfile'

const GetGithubStrategy = require('passport-github').Strategy

const {
    HOST_PORT = 3000,
    GITHUB_CLIENT_ID = '',
    GITHUB_CLIENT_SECRET = '',
} = process.env

export const getGithubStrategy = () => {
    return new GetGithubStrategy({
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: `http://localhost:${HOST_PORT}/auth/github/callback`
        },
        (accessToken: string, refreshToken: string, profile: any, cb: any) => {

            // console.log(accessToken)
            // console.log(refreshToken)

            updateUserProfile(profile)

            return cb(null, profile)
        }
    )

}