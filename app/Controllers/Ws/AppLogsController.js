'use strict'

class AppLogsController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(message) {
    console.log(message)
    this.socket.broadcastToAll('appLogs', message)
  }

  onClose() {
    console.log('close')
  }

  onError() {
    console.log('error')
  }

}

module.exports = AppLogsController
