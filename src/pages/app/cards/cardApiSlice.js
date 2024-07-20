import { apiSlice } from "@/store/api/apiSlice";

export const cardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCards: builder.query({
            query: () => '/admin/cards',
            transformResponse: (response) => response.data
        }),
        getCardCategories: builder.query({
            query: () => '/admin/card-categories',
            transformResponse: (response) => response.data
        }),
        getCardById: builder.query({
            query: (id) => `/admin/cards/${id}`,
            transformResponse: (response) => response.data
        }),
        getCardCategoriesById: builder.query({
            query: (id) => `/admin/card-categories/${id}`,
            transformResponse: (response) => response.data
        }),
        createCard: builder.mutation({
            query: (data) => ({
                url: '/admin/cards',
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response.data
        }),
        createCardCategories: builder.mutation({
            query: (data) => ({
                url: '/admin/card-categories',
                method: "POST",
                body: data,
            }),
            transformResponse: (response) => response.data
        }),
        putCard: builder.mutation({
            query: (data) => ({
                url: `/admin/cards/${data.id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response) => response.data
        }),
        putCardCategories: builder.mutation({
            query: (data) => ({
                url: `/admin/card-categories/${data.id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response) => response.data
        }),
    }),
});
export const { useGetCardsQuery, useGetCardCategoriesQuery } = cardApi;

