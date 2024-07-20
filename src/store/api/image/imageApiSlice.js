import { apiSlice } from "../apiSlice";

export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (image) => ({
        url: "/media/images",
        method: "POST",
        body: image,
      }),
    }),
    getImages: builder.query({
      query: () => '/media/images',
      transformResponse: (response) => response.data
    }),
  }),
});
export const { useUploadMutation } = imageApi;
