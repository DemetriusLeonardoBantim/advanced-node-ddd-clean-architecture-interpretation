/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { type HttpGetClient } from '../http/client'

export class FacebookApi implements LoadFacebookUserApi {
  private readonly baseUrl = 'https://graph.facebook.com'
  constructor(
    private readonly httpClient: HttpGetClient,
    private readonly client_id: string,
    private readonly client_secret: string

  ) { }

  async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    const appToken = await this.getAppToken()

    const debugToken = await this.getDebugToken(appToken.access_token, params.token)

    const userrInfo = await this.httpClient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: params.token
      }
    })

    return {
      facebookId: userrInfo.id,
      name: userrInfo.name,
      email: userrInfo.email
    }
  }

  private async getAppToken(): Promise<any> {
    return await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'client_credentials'
      }
    })
  }

  private async getDebugToken(appToken: string, clientToken: string): Promise<any> {
    await this.httpClient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken,
        input_token: clientToken
      }
    })
  }
}
