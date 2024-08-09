import { apiSlice } from "@/store/api/apiSlice";

export const referralApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Referrals'],
    endpoints: (builder) => ({
        getReferrals: builder.query({
            query: (id) => ({ url: `/admin/players/network`, params: (id && { id }) }),
            transformResponse: (response) => response.data,
            providesTags: ["Referrals"],
        }),
    }),
});
export const { useGetReferralsQuery } = referralApiSlice;

