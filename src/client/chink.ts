const fetchRepo = () => {
    fetch('/api/repo/clone')
        .then((response) => response.json())
        .then((myJson) => {
            console.log(JSON.stringify(myJson))
        })
}

const initChink = () => {
    console.log('Chink initialized!')

    const cloneRepoButton = document.querySelector('#clone-repo-button')

    console.log(cloneRepoButton)

    if (cloneRepoButton) {
        cloneRepoButton.addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault()
            console.log('will clone a repo')
            fetchRepo()
        })

    }

}

initChink()