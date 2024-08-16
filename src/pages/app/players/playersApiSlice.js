import { apiSlice } from "@/store/api/apiSlice";

export const playersApi = apiSlice.injectEndpoints({
    tagTypes: ['Players'],
    endpoints: (builder) => ({
        getPlayers: builder.query({
            query: (id) => ({ url: `/admin/players`, params: (id && { id }) }),
            transformResponse: (response) => response.data,
            providesTags: ["players"],
        }),
    }),
});
export const { useGetPlayersQuery } = playersApi;

