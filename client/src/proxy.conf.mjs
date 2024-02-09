export default [
  {
    context: [
      '/api',
      '/auth',
      '/socket.io',
      '/etc'
    ],
    target: 'http://localhost:3333',
    secure: false,
    pathRewrite: {
      '^/api': '',
      '^/auth': '/auth',
      '^/socket.io': '/socket.io',
      '^/etc': '/etc'
    },
  }
]