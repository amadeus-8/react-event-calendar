import { axiosInstance } from '../axiosInstance'
import { iUserInfo } from '../../interfaces/userInterface'

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

export const userAPI = {
    async getUserInfo(): Promise<iUserInfo | string> {
        if (isProd) {
            const { data } = await axiosInstance.get('/user')
            return data
        }
        return ''
    },
}
