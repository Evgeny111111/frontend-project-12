import io from 'socket.io-client'
import useAuthContext from '../auth/authProvider';

import { useGetChannelsQuery } from '../API/channels'; 

import { useGetMessagesQuery } from '../API/messages';



const Example = () => {
    const { data: channels, error, isLoading } = useGetChannelsQuery();
  
    // Логируем только после загрузки
    if (!isLoading && channels) {
      console.log('channels in Example', channels);
    }

    return (
        <div>
          {isLoading && <p>Loading channels...</p>}
          {error && <p>Error loading channels: {error.message}</p>}
          {channels && (
            <ul>
              {channels.map((channel) => (
                <li key={channel.id}>{channel.name}</li>
              ))}
            </ul>
          )}
        </div>
      );
    };
    
    export default Example;