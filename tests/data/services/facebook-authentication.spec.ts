import { type FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  async perform (params: FacebookAuthentication.Params): Promise<void> {}
}

interface LoadFacebookUserByTokenApi {
  loadUserByToken: (token: string) => Promise<void>
}

class LoadFacebookUserByTokenApiSpy implements LoadFacebookUserByTokenApi {
  async loadUserByToken (token: string): Promise<void> {

  }
}

describe('FacebookAuthenticationService', () => {
  it('', async () => {
    const facebookApi = new LoadFacebookUserByTokenApiSpy()
    const sut = new FacebookAuthenticationService(facebookApi)
    await sut.perform({ token: 'any_token' })

    expect(facebookApi.token).toBe('')
  })
})
