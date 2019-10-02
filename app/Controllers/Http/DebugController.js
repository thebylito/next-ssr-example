'use strict'

const Ws = use('Ws')

class DebugController {
  async create({request}){
    const {userId, debug} = request.post()
    const appLogsChannel = Ws.getChannel('appLogs').topic('appLogs');
    if(appLogsChannel){
      appLogsChannel.broadcast('appLogs', {
        userId,
        debug,
        time: new Date(),
      })
    }
    return {success: true}
  }
}

module.exports = DebugController
