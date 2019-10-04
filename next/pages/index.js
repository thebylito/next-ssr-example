import React from 'react';
import List from '@material-ui/core/List';
import Nav from '../components/nav';
import Head from '../components/head';
import LogCard from '../components/LogCard';

export default function HomePage() {
  const [socket, setSocket] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [localState, setLocalState] = React.useState({
    feed: [],
  });

  const handleMessageAdd = (message) => {
    // socket.emit('message', 'aaaaaaaaaaaaaaaa')
    setLocalState((oldState) => ({
      feed: [message, ...oldState.feed],
    }));
  };

  React.useEffect(() => {
    const Connection = require('../lib/socket').default;
    const init = new Connection('appLogs').connect();
    setSocket(init);
    const subscribe = init.subscribe('appLogs');
    subscribe.on('ready', () => setIsLoading(false));
    subscribe.on('close', () => setIsLoading(null));
    subscribe.on('appLogs', handleMessageAdd);
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);
  return (
    <>
      <Head title="Home" />
      <Nav isLoading={isLoading} />
      <List>
        {localState.feed.map((item, i) => <LogCard item={item} key={`id-${i.toString()}`} />)}
      </List>
    </>
  );
}
