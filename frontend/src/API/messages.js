import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../auth/authProvider';

const DELETE_MESSAGE_URL = (channelId) => `messages/${encodeURIComponent(channelId)}`;

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'messages',
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
      }),
    }),
    deleteMessagesByChannelId: builder.mutation({
      query: (channelId) => ({
        url: DELETE_MESSAGE_URL(channelId), // Используем функцию для формирования URL
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessagesByChannelIdMutation,
} = messagesApi;
