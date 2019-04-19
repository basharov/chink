const fetch = require('node-fetch')

export const loadRepos = (accessToken: string) => {
    console.log('Will load repos')
    fetch('https://api.github.com/user/repos',
        {
            headers: {'Authorization': `Bearer ${accessToken}`},
        })
        .then((res: any) => res.json())
        .then((json: any) => console.log(json))
}