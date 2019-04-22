import { updateUserProfile } from '../db/updateUserProfile'
import { Strategy } from 'passport-github2'

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

const githubStrategyCallback = async (accessToken: string, refreshToken: string, githubProfile: any, done: any) => {

    console.log(`accessToken: ${accessToken}`)

    const profile = await updateUserProfile(githubProfile)

    return done(null, {profile, accessToken, refreshToken})
}

export const getGithubStrategy = () => {
    return new Strategy(githubStrategyParams, githubStrategyCallback)

}