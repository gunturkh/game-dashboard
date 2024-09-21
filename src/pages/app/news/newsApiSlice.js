import { apiSlice } from "@/store/api/apiSlice";

export const newsApi = apiSlice.injectEndpoints({
    tagTypes: ['News'],
    endpoints: (builder) => ({
        postNews: builder.mutation({
            query: (data) => ({
                url: `/admin/broadcasts`,
                method: "POST",
                body: { message: data.message, image_url: data.image_url, telegram_ids: data.telegram_ids, type: data.type, is_all_players: data.is_all_players }
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['News']
        })
    }),
});
export const { usePostNewsMutation } = newsApi;

