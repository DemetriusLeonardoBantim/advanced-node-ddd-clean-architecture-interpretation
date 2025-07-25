import { AuthenticationError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly LoadFacebookUserApi: LoadFacebookUserApiSpy) {}
  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.LoadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

export namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('Shoud call LoadFacebookUserApi with correct params', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)
    await sut.perform({ token: 'any_token' })

    expect(LoadFacebookUserApi.token).toBe('')
  })

  it('Shoud return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toBe(new AuthenticationError())
  })
})
