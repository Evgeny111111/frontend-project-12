const routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  notFound: '*',
  messages: '/api/v1/messages',
  messageByChannel: (channelId) => `/api/v1/messages/${channelId}`,
};

export default routes;
