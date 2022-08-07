import { apiSlice } from "../../app/api/apiSlice";

export const coursesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCourses: builder.query({
            query: () => '/courses',
            keepUnusedDataFor: 5
        })
    })
})

export const {
    useGetCoursesQuery
} = coursesApiSlice