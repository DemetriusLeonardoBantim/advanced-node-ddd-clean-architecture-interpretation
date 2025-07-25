export interface FacebookAuthentication {
  perform: (
    params: FacebookAuthentication.Params
  ) => AccessToken | AuthenticationError
}

namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}

type AccessToken = {
  accessToken: string
}

class AuthenticationError extends Error {
  constructor () {
    super('Authentication failed')
    this.name = 'AuthenticationError'
  }
}
