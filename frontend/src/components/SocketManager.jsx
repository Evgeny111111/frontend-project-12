import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { channelsApi } from '../API/channels';
import { messagesApi } from '../API/messages';
import socket from './socket'; // Импортируем уже созданный сокет

const SocketManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('WebSocket connected:', socket.id);
    });

    socket.on('newChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => [...draft, payload]),
      );
    });

    socket.on('removeChannel', (channelId) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((channel) => channel.id !== channelId.id)),
      );
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => draft.filter((message) => message.channelId !== channelId.id)),
      );
    });

    socket.on('renameChannel', (updatedChannel) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.map((channel) => (channel.id === updatedChannel.id ? { ...channel, name: updatedChannel.name } : channel))),
      );
    });

    socket.on('newMessage', (newMessage) => {
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => [...draft, newMessage]),
      );
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('newMessage');
    };
  }, [dispatch]);

  return null;
};

export default SocketManager;
