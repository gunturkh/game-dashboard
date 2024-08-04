import { apiSlice } from "@/store/api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
    tagTypes: ['Dashboard'],
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => ({ url: `/admin/dashboard` }),
            transformResponse: (response) => response.data,
            providesTags: ["Dashboard"],
        }),
    }),
});
export const { useGetDashboardQuery } = dashboardApi;

