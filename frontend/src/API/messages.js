import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../auth/authProvider';
import routes from '../routes/routes';

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
      query: () => routes.api.messages,
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: routes.api.messages,
        method: 'POST',
        body: newMessage,
      }),
    }),
    deleteMessagesByChannelId: builder.mutation({
      query: (channelId) => ({
        url: `${routes.api.messages}/${channelId}`,
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
