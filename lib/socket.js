import Ws from '@adonisjs/websocket-client';

class SocketConnection {
  constructor(channel){
    this.channel = channel;
    this.ws = Ws();
  }

  connect = () => {
    this.ws.connect();
    this.ws.on('open', () => {
      console.log('Connection initialized')
    });
    this.ws.on('close', () => {
      console.log('Connection closed')
    });
    return this
  }

  subscribe = (channel,handler) => {
    if (!this.ws) {
      setTimeout(() => this.ws.subscribe(this.channel), 1000)
    } else {
      const result = this.ws.subscribe(this.channel);
      result.on('error', (error) => {
        console.error(error)
      });
      return result
    }
  }

  emit = (event, data) => {
    if (!this.ws) {
      setTimeout(() => this.ws.subscribe(this.channel), 1000)
    } else {
      return this.ws.getSubscription(this.channel).emit(event, data)
    }
  }
}

export default SocketConnection;
