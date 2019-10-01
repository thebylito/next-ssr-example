'use strict'

const Ws = use('Ws')

class DebugController {
  async create({request}){
    const appLogsChannel = Ws.getChannel('appLogs')
    console.log(appLogsChannel)
    appLogsChannel.emit('onAppLog', 'Hello world')
    return {ola: 'mundo'}
  }
}

module.exports = DebugController
