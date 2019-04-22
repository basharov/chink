import { TransferProgress } from 'nodegit'
import rimraf = require('rimraf')

const Git = require('nodegit')

export const cloneRepo = (accessToken: string, githubUserId: string, repoName: string) => {

    const repoUrl = `https://github.com/${githubUserId}/${repoName}`
    console.log(`Will clone repo: ${repoUrl}`)

    // https://www.nodegit.org/guides/cloning/gh-two-factor/

    const destPath = `./tmp/${githubUserId}/${repoName}`

    rimraf(destPath,
        () => {
            Git.Clone(repoUrl, destPath, {
                fetchOpts: {
                    callbacks: {
                        transferProgress: (stats: TransferProgress) => {
                            console.log('transfer progress')
                            console.log(`${(stats.indexedObjects as any)()}/${(stats.totalObjects as any)()}`)
                        },
                        certificateCheck: () => 1,
                        credentials: () => Git.Cred.userpassPlaintextNew(accessToken, 'x-oauth-basic')
                    }
                }

            })
                .catch((err: Error) => {
                    console.error(err)
                })

        })

}
