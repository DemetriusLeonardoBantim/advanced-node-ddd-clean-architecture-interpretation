import { AuthenticationError } from '@/domain/errors'
import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication'

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
