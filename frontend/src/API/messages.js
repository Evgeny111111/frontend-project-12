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
      query: () => routes.api.messages, // Используем маршрут для получения сообщений
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: routes.api.messages, // Используем маршрут для добавления сообщений
        method: 'POST',
        body: newMessage,
      }),
    }),
    deleteMessagesByChannelId: builder.mutation({
      query: (channelId) => ({
        url: `${routes.api.messages}?channelId=${channelId}`, // Указываем канал для удаления сообщений
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
