import { IUserProfile } from './IUserProfile'

export interface IUser {
    id: number

    github_user_id: string
    github_profile: IUserProfile
}