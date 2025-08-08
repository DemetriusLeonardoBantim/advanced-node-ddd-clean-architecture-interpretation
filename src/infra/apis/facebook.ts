import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { type HttpGetClient } from '../http/client'
import { access } from 'fs'

export class FacebookApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor(
    private readonly httpClient: HttpGetClient,
    private readonly client_id: string,
    private readonly client_secret: string

  ) { }

  async loadUser(params: LoadFacebookUserApi.Params): Promise<void> {
    const appToken = await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'client_credentials'
      }
    })

    const debugToken = await this.httpClient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: params.token
      }
    })

    await this.httpClient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: params.token
      }
    })
  }
}
