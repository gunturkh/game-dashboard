import { apiSlice } from "@/store/api/apiSlice";

export const cardApi = apiSlice.injectEndpoints({
    tagTypes: ['Cards', 'CardCategories'],
    endpoints: (builder) => ({
        getCards: builder.query({
            query: () => '/admin/cards',
            transformResponse: (response) => response.data,
            providesTags: ["Cards"],
        }),
        getCardCategories: builder.query({
            query: () => '/admin/card-categories',
            transformResponse: (response) => response.data,
            providesTags: ["CardCategories"],
        }),
        getCardById: builder.query({
            query: (id) => `/admin/cards/${id}`,
            transformResponse: (response) => response.data,
            providesTags: ["Cards"],
        }),
        getCardCategoriesById: builder.query({
            query: (id) => `/admin/card-categories/${id}`,
            transformResponse: (response) => response.data,
            providesTags: ["CardCategories"],
        }),
        createCard: builder.mutation({
            query: (data) => ({
                url: '/admin/cards',
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Cards']
        }),
        createCardCategories: builder.mutation({
            query: (data) => ({
                url: '/admin/card-categories',
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['CardCategories']
        }),
        putCard: builder.mutation({
            query: (data) => ({
                url: `/admin/cards/${data.id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['Cards']
        }),
        putCardCategories: builder.mutation({
            query: (data) => ({
                url: `/admin/card-categories/${data.id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response) => response.data,
            invalidatesTags: ['CardCategories']
        }),
    }),
});
export const { useGetCardsQuery, useGetCardCategoriesQuery, useGetCardByIdQuery, useGetCardCategoriesByIdQuery, useCreateCardMutation, useCreateCardCategoriesMutation, usePutCardMutation, usePutCardCategoriesMutation } = cardApi;

