'use strict'

class AppLogsController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onAppLog(message) {
    console.log(message)
    this.socket.broadcastToAll('message', message)
  }

    onClose() {
      // same as: socket.on('close')
    }

    onError() {
      // same as: socket.on('error')
    }
}

module.exports = AppLogsController
