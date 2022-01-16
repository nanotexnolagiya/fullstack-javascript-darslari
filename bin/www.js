const Server = require('../src/server.js')

const server = new Server()

server.start(() => {
  console.log('Server started on port: ' + process.env.PORT)
})