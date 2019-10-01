const Ws = use('Ws')

Ws.channel('appLogs', ({socket}) => {
  console.log(socket)
  console.log(socket.topic)
})
