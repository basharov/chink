import { getUser } from './getUser'
import { poolClient } from './initializePool'

export const updateUserProfile = async (profile: any) => {

    console.log(profile.provider, profile.id)

    const user = await getUser(profile.provider, profile.id)

    if (user) {
        // console.log('FOUND THIS')
        // console.log(user.id)
        // console.log('==========')
    } else {

        try {
            const queryString =
                `
                INSERT INTO users(primary_git_service_name, primary_git_service_user_id, primary_git_service_profile) VALUES($1, $2, $3)
                `
            /*
                            ON CONFLICT ON CONSTRAINT unique_service_name_and_user_id_pair
                            DO
                                UPDATE
                                    SET secondary_git_service_profile = $3
            */

            const values = [profile.provider, profile.id, profile]

            const result = await poolClient.query(queryString, values)

        } catch (err) {
            console.trace((err))
        } finally {
            // client.release()
        }

    }

}