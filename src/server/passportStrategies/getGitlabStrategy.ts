import { updateUserProfile } from '../db/updateUserProfile'

const GetGitlabStrategy = require('passport-gitlab2').Strategy

const {
    HOST_PORT = 3000,

    GITLAB_APP_ID = '',
    GITLAB_APP_SECRET = ''
} = process.env

export const getGitlabStrategy = () => {
    return new GetGitlabStrategy({
            clientID: GITLAB_APP_ID,
            clientSecret: GITLAB_APP_SECRET,
            callbackURL: `http://localhost:${HOST_PORT}/auth/gitlab/callback`
        },
        (accessToken: string, refreshToken: string, profile: any, cb: any) => {
            console.log(accessToken)
            console.log(refreshToken)

            // loadRepos(accessToken)
            updateUserProfile(profile)

            return cb(null, profile)
        }
    )

}
