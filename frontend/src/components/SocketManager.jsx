import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { channelsApi } from '../API/channels';
import { messagesApi } from '../API/messages';

const SocketManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socketInstance = io();

    socketInstance.on('connect', () => {
      console.log('WebSocket connected:', socketInstance.id);
    });

    socketInstance.on('newChannel', (payload) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => [...draft, payload]),
      );
    });

    socketInstance.on('removeChannel', (channelId) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((channel) => channel.id !== channelId.id)),
      );
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => draft.filter((message) => message.channelId !== channelId.id)),
      );
    });

    socketInstance.on('renameChannel', (updatedChannel) => {
      dispatch(
        channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.map((channel) => (channel.id === updatedChannel.id ? { ...channel, name: updatedChannel.name } : channel))),
      );
    });

    socketInstance.on('newMessage', (newMessage) => {
      dispatch(
        messagesApi.util.updateQueryData('getMessages', undefined, (draft) => [...draft, newMessage]),
      );
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    return () => {
      socketInstance.off('newChannel');
      socketInstance.off('removeChannel');
      socketInstance.off('renameChannel');
      socketInstance.off('newMessage');
    };
  }, [dispatch]);

  return null;
};

export default SocketManager;
