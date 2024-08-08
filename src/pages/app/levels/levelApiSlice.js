import { apiSlice } from "@/store/api/apiSlice";

export const levelApi = apiSlice.injectEndpoints({
    tagTypes: ['Levels'],
    endpoints: (builder) => ({
        getLevels: builder.query({
            query: (id) => ({ url: `/admin/levels`, params: (id && { id }) }),
            transformResponse: (response) => response.data,
            providesTags: ["Levels"],
        }),
        createLevel: builder.mutation({
            query: (data) => ({
                url: '/admin/levels',
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Cards']
        }),
    }),
});
export const { useGetLevelsQuery, useCreateLevelMutation } = levelApi;

