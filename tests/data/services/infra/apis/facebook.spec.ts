import { type LoadFacebookUserApi } from '@/data/contracts/apis'

class FacebookApi {
  async loadUser(params: LoadFacebookUserApi.Params): Promise<void> {

  }
}

describe('FacebookApi', () => {
  it('should get app token', async () => {
    const sut = new FacebookApi()

    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenNthCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token'
    })
  })
})
