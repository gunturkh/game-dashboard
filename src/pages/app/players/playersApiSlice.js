import { apiSlice } from "@/store/api/apiSlice";

export const playersApi = apiSlice.injectEndpoints({
    tagTypes: ['Players'],
    endpoints: (builder) => ({
        getPlayers: builder.query({
            query: (id) => ({ url: `/admin/players`, params: (id && { id }) }),
            transformResponse: (response) => response.data,
            providesTags: ["players"],
        }),
        putPlayer: builder.mutation({
            query: (data) => ({
                url: `/admin/players/${data.id}`,
                method: "PUT",
                body: { points_balance: parseInt(data.points_balance) }
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['players']
        })
    }),
});
export const { useGetPlayersQuery, usePutPlayerMutation } = playersApi;

