import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../auth/authProvider';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
    tagTypes: ['Channel'],
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
      providesTags: ['Channel'], // Кэширование данных
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: 'channels',
        method: 'POST',
        body: newChannel,
      }),
      // После добавления канала, сбрасываем кэш для 'Channel' для перезагрузки списка
      invalidatesTags: ['Channel'],
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
      // После удаления канала, сбрасываем кэш для 'Channel'
      invalidatesTags: ['Channel'],
    }),
    updateChannel: builder.mutation({
      query: ({ id, newChannelName }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: { name: newChannelName },
      }),
      // После обновления канала, сбрасываем кэш для 'Channel'
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useDeleteChannelMutation, useUpdateChannelMutation,
} = channelsApi;
