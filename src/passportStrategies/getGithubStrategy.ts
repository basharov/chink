import { updateUserProfile } from '../db/updateUserProfile'

const GetGithubStrategy = require('passport-github').Strategy

const {
    HOST_PORT = 3000,
    GITHUB_CLIENT_ID = '',
    GITHUB_CLIENT_SECRET = '',
} = process.env

const githubStrategyParams = {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `http://localhost:${HOST_PORT}/auth/github/callback`
}

const githubStrategyCallback = async (accessToken: string, refreshToken: string, profile: any, cb: any) => {

    await updateUserProfile(profile)

    return cb(null, profile)
}

export const getGithubStrategy = () => {
    return new GetGithubStrategy(githubStrategyParams, githubStrategyCallback)

}