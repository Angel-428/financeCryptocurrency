import axios from 'axios'
import { getLoginData } from './common'

export const universalGetRequestWithParams = async (url: string, params: {} = {}, headers: {} = {}) => {
    const config = {
        url: url,
        params: params,
        headers: headers,
    }
    const loginData = await getLoginData()
    config.headers['Authorization'] = `Bearer ${loginData?.access_token || ''}`

    try {
        return await axios.get(config.url, {
            headers: config.headers,
            params: config.params,
        })
    } catch (err: any) {
        return err.response
    }
}

export const universalPostRequestWithData = async (url: string, data: {} = {}, headers: {} = {}) => {
    const config = {
        url: url,
        data: data,
        headers: headers,
    }

    const loginData = await getLoginData()
    config.headers['Authorization'] = `Bearer ${loginData?.access_token || ''}`

    try {
        return await axios.post(config.url, config.data, {
            headers: config.headers,
        })
    } catch (err: any) {
        return err.response
    }
}

export const universalPutRequestWithData = async (url: string, data: {} = {}, headers: {} = {}) => {
    const config = {
        url: url,
        data: data,
        headers: headers,
    }

    const loginData = await getLoginData()
    config.headers['Authorization'] = `Bearer ${loginData?.access_token || ''}`

    try {
        return await axios.put(config.url, config.data, {
            headers: config.headers,
        })
    } catch (err: any) {
        return err.response
    }
}

export const universalDeleteRequestWithData = async (url: string, data: {} = {}, headers: {} = {}) => {
    const config = {
        url: url,
        data: data,
        headers: headers,
    }

    const loginData = await getLoginData()
    config.headers['Authorization'] = `Bearer ${loginData?.access_token || ''}`

    try {
        return await axios.delete(config.url, {
            headers: config.headers,
            data: config.data,
        })
    } catch (err: any) {
        return err.response
    }
}
