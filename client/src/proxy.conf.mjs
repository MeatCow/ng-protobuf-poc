export default [
  {
    context: [
      '/api',
    ],
    target: 'http://localhost:3333',
    secure: false,
    pathRewrite: {
      '^/api': '',
    },
  }
]