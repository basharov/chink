import { GetParametersResult } from 'aws-sdk/clients/ssm'

export interface IStoreParameters {
    HostPort: string

    GithubClientId: string
    GithubClientSecret: string

    PgHost: string
    PgPort: string
    PgDatabase: string
    PgUser: string
    PgPassword: string
}

export const formatSsmParameters = (data: GetParametersResult): IStoreParameters => {

    let obj: any = {}

    if (data && data.Parameters) {
        data.Parameters.forEach((parameter) => {
            if (parameter.Name) {
                obj[parameter.Name] = parameter.Value
            }
        })

    }

    return obj
}
