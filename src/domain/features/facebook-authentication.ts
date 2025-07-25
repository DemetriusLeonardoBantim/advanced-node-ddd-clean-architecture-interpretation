import { type AccessToken } from '@/domain/models'
import { type AuthenticationError } from '@/domain/errors/'

export interface FacebookAuthentication {
  perform: (
    params: FacebookAuthentication.Params
  ) => AccessToken | AuthenticationError
}

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
