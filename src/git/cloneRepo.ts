import { TransferProgress } from 'nodegit'

const Git = require('nodegit')

export const cloneRepo = (accessToken: string, githubUserId: string, repoName: string) => {

    const repoUrl = `https://github.com/${githubUserId}/${repoName}`
    console.log(`Will clone repo: ${repoUrl}`)

    // https://www.nodegit.org/guides/cloning/gh-two-factor/

    Git.Clone(repoUrl, `./tmp/${githubUserId}/${repoName}`, {
        fetchOpts: {
            callbacks: {
                transferProgress: (stats: TransferProgress) => {
                    console.log('transfer progress')
                    console.log(`${(stats.indexedObjects as any)()}/${(stats.totalObjects as any)()}`)
                },
                certificateCheck: function () {
                    return 1
                },
                credentials: function () {
                    return Git.Cred.userpassPlaintextNew(accessToken, 'x-oauth-basic')
                }
            }
        }

    })
        .catch((err: Error) => {
            console.error(err)
        })
}
