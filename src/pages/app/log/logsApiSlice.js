import { apiSlice } from "@/store/api/apiSlice";

export const logApi = apiSlice.injectEndpoints({
    tagTypes: ['Logs'],
    endpoints: (builder) => ({
        getLogsPoint: builder.query({
            query: () => ({ url: `/admin/logs/point` }),
            transformResponse: (response) => response.data,
            providesTags: ["Points"],
        }),
        getLogsProfit: builder.query({
            query: () => ({ url: `/admin/logs/profit` }),
            transformResponse: (response) => response.data,
            providesTags: ["Points"],
        }),
        getLogsLevel: builder.query({
            query: () => ({ url: `/admin/logs/level` }),
            transformResponse: (response) => response.data,
            providesTags: ["Points"],
        }),
    }),
});
export const { useGetLogsPointQuery, useGetLogsProfitQuery, useGetLogsLevelQuery } = logApi;

