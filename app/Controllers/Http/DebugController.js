
const Ws = use('Ws');

class DebugController {
  async create({ request }) {
    const {
      userId, debug, appName, type,
    } = request.post();
    const appLogsChannel = Ws.getChannel('appLogs').topic('appLogs');
    if (appLogsChannel) {
      appLogsChannel.broadcast('appLogs', {
        userId,
        debug,
        time: new Date(),
        appName,
        type,
      });
    }
    return { success: true };
  }
}

module.exports = DebugController;
