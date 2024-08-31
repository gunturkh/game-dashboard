import { apiSlice } from "@/store/api/apiSlice";

export const dailycomboApi = apiSlice.injectEndpoints({
    tagTypes: ['DailyCombo'],
    endpoints: (builder) => ({
        getDailyCombo: builder.query({
            query: () => ({ url: `/admin/combos` }),
            transformResponse: (response) => response.data,
            providesTags: ["DailyCombo"],
        }),
        getDailyComboById: builder.query({
            query: (id) => `/admin/combos/${id}`,
            transformResponse: (response) => response.data,
            providesTags: ["DailyCombo"],
        }),
        createDailyCombo: builder.mutation({
            query: (data) => ({
                url: '/admin/combos',
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response.data,
            providesTags: ["DailyCombo"],
        }),
        putDailyCombo: builder.mutation({
            query: (data) => ({
                url: `/admin/combos/${data.id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response) => response.data,
            providesTags: ["DailyCombo"],
        }),
    }),
});
export const { useGetDailyComboQuery, useGetDailyComboByIdQuery, useCreateDailyComboMutation, usePutDailyComboMutation, } = dailycomboApi;

