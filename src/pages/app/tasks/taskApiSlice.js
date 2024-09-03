import { apiSlice } from "@/store/api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => ({ url: `/admin/tasks`}),
            transformResponse: (response) => response.data,
            providesTags: ["Tasks"],
        }),
        getTaskById: builder.query({
            query: (id) => ({ url: `/admin/tasks/${id}`}),
            transformResponse: (response) => response.data,
            providesTags: ["Tasks"],
        }),
        getTaskSubmissions: builder.query({
            query: () => ({ url: `/admin/task-submissions`}),
            transformResponse: (response) => response.data,
            providesTags: ["TaskSubmission"],
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
        putTask: builder.mutation({
            query: (data) => ({
                url: `/admin/tasks/${data.id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Tasks']
        }),
        putSubmission: builder.mutation({
            query: (data) => ({
                url: `/admin/task-submissions/${data.id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['TaskSubmission']
        }),
        deleteTask: builder.mutation({
            query: (data) => ({
                url: `/admin/tasks/${data.id}`,
                method: "DELETE",
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Tasks']
        }),
    }),
});
export const { useGetTasksQuery, useGetTaskByIdQuery, useGetTaskSubmissionsQuery, useCreateTasksMutation, usePutTaskMutation, usePutSubmissionMutation, useDeleteTaskMutation } = taskApi;

