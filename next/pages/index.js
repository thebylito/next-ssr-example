import React from 'react';
import List from '@material-ui/core/List';
import { useDispatch } from 'react-redux';
import Nav from '../components/nav';
import Head from '../components/head';
import LogCard from '../components/LogCard';


import { withRedux } from '../lib/redux';
// import useInterval from '../lib/useInterval';


function HomePage() {
  const dispatch = useDispatch();


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

HomePage.getInitialProps = ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore;
  // dispatch({
  //   type: 'TICK',
  //   light: typeof window === 'object',
  //   lastUpdate: Date.now(),
  // });

  return {};
};

export default withRedux(HomePage);
