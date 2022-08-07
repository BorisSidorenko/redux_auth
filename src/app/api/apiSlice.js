import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut } from '../../features/auth/authSlice'
import cookie from 'js-cookie'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api',
    prepareHeaders: (headers) => {
        const token = cookie.get('jwt')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)            
        }
        return headers
    }
})

const baseAuthQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        api.dispatch(logOut())
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseAuthQuery,
    endpoints: builder => ({})
})