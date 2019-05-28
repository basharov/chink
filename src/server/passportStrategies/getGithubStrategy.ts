import { updateUserProfile } from '../db/updateUserProfile'
import { Strategy } from 'passport-github2'
import { StoreParameters } from '../loadStoreParameters'

const {
    ENVIRONMENT = 'production'
} = process.env

const githubStrategyCallback = async (accessToken: string, refreshToken: string, githubProfile: any, done: any) => {

    console.log(`accessToken: ${accessToken}`)

    const profile = await updateUserProfile(githubProfile)

    return done(null, {profile, accessToken, refreshToken})
}

export const getGithubStrategy = (): Strategy => {

    const githubStrategyParams = ENVIRONMENT === 'production' ? {
            clientID: StoreParameters.GithubClientId,
            clientSecret: StoreParameters.GithubClientSecret,
            callbackURL: `http://localhost:${StoreParameters.HostPort}/auth/github/callback`
        }
        :
        {
            clientID: StoreParameters.GithubClientId,
            clientSecret: StoreParameters.GithubClientSecret,
            callbackURL: `http://localhost:${StoreParameters.HostPort}/auth/github/callback`
        }

    return new Strategy(githubStrategyParams, githubStrategyCallback)
}