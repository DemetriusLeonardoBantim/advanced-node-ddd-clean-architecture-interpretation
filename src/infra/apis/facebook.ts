import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { type HttpGetClient } from '../http/client'

export class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor(
    private readonly httpClient: HttpGetClient,
    private readonly client_id: string,
    private readonly client_secret: string

  ) { }

  async loadUser(params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'client_credentials'
      }
    })
  }
}
