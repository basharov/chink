import { getUser } from './getUser'
import { poolClient } from './initializePool'

export const updateUserProfile = async (profile: any) => {

    console.log(profile.provider, profile.id)

    const user = await getUser(profile.id)

    if (user) {
        console.log('FOUND THIS')
        console.log(user.id)
        console.log('==========')

        try {
            const queryString = 'UPDATE users SET github_profile = $2 WHERE github_user_id = $1'

            const values = [profile.id, profile]

            const result = await poolClient.query(queryString, values)

        } catch (err) {
            console.trace((err))
        } finally {
            // client.release()
        }

    } else {

        try {
            const queryString =
                `
                INSERT INTO users(github_user_id, github_profile) VALUES($1, $2)
                `

            const values = [profile.id, profile]

            const result = await poolClient.query(queryString, values)

        } catch (err) {
            console.trace((err))
        } finally {
            // client.release()
        }

    }

}