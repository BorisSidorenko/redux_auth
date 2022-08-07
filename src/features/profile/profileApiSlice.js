import { apiSlice } from "../../app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => '/user-profiles'
        })
    })
})

export const {
    useGetProfileQuery
} = profileApiSlice