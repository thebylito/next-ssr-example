import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import connection from '../lib/socket';

class Room extends React.Component {
  state = {
    messages: []
  };
  componentDidMount() {
    connection.connect();
    subscription = connection.subscribe(`appLogs`, this.handleMessageAdd);
    // loading existing messages
    //this.fetchMessages();
  }

  componentWillUnmount() {
    subscription.close();
  }

  handleMessageAdd = message => {
    console.log(message)
  };


  render() {
    return (
      <div>
        <Head title="Home" />
          <Nav />
          <div className="hero">
            <h1 className="title">Welcome to Next!</h1>
          </div>
  </div>)
  }
 }

 export default Room;
