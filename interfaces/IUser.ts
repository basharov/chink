export interface IUser {
    id: number

    primary_git_service_name: 'github' | 'gitlab'
    primary_git_service_user_id: string
    primary_git_service_profile: string

    secondary_git_service_name?: 'github' | 'gitlab'
    secondary_git_service_user_id?: string
    secondary_git_service_profile?: string
}