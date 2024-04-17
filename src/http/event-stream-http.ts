import es6Promise from 'es6-promise'
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig} from 'axios'
import { merge } from 'lodash'

es6Promise.polyfill()

export enum RequestMethods {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
    Options = 'options'
}

const { VITE_STREAM_BASE_URL, VITE_PLAYHT_API_KEY, VITE_PLAYHT_USER_ID } = import.meta.env

class Http {
    baseUrl: string | undefined = '/'
    request: AxiosInstance
    config: AxiosRequestConfig

    constructor(config: AxiosRequestConfig) {
        this.config = merge({
            withCredentials: false,
        }, config)

        this.baseUrl = this.config.baseURL
        this.request  = axios.create(this.config)
    }

    private async fetch(requestConfig: AxiosRequestConfig): Promise<AxiosResponse> {
        try {
            const options: AxiosRequestConfig = {
                method: RequestMethods.Post,
                url: '',
                headers: {
                    accept: 'text/event-stream',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${VITE_PLAYHT_API_KEY}`,
                    'X-USER-ID': VITE_PLAYHT_USER_ID,
                    'Access-Control-Allow-Origin': '*'
                },
                params: {},
                data: {},
                ...requestConfig
            }
            const response = await this.request(options)
            const result = merge({
                code: `${response.status}`,
                data: response.data,
            }, response)
            console.log(result)
            // const reader = response.body.getReader();
            return result.data
        } catch(e) {
            return new Promise(resolve => {
                resolve(null as any)
            })
        }
    }

    async get(requestConfig: AxiosRequestConfig): Promise<AxiosResponse> {
        requestConfig.method = RequestMethods.Get
        return await this.fetch(requestConfig)
    }

    async post(requestConfig: AxiosRequestConfig): Promise<AxiosResponse> {
        requestConfig.method = RequestMethods.Post
        return await this.fetch(requestConfig)
    }
}

export const playHTHttp = new Http({ baseURL: VITE_STREAM_BASE_URL })