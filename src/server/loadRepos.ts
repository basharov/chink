const fetch = require('node-fetch')

export const loadRepos = (accessToken: string): Promise<any[]> => {
    console.log('Will load repos')
    return fetch('https://api.github.com/user/repos',
        {
            headers: {'Authorization': `Bearer ${accessToken}`},
        })
        .then((res: any) => res.json())
}