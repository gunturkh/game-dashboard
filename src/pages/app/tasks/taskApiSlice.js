import { apiSlice } from "@/store/api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: (id) => ({ url: `/admin/tasks`, params: (id && { id }) }),
            transformResponse: (response) => response.data,
            providesTags: ["Tasks"],
        }),
        createTasks: builder.mutation({
            query: (data) => ({
                url: '/admin/tasks',
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Tasks']
        }),
    }),
});
export const { useGetTasksQuery, useCreateTasksMutation } = taskApi;

