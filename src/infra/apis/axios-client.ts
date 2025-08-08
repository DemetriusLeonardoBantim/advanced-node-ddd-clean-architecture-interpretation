/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios'
import { type HttpGetClient } from '../http'

type Input = any

export class AxiosHttpClient implements HttpGetClient {
  async get({ url, params }: Input): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
