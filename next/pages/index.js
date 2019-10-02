import React from 'react';
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false

};
const formatarData = (data) => new Intl.DateTimeFormat('pt-BR', options).format(new Date(data));

let connection;

export default function HomePage() {
  const [socket, setSocket] = React.useState(null)

  const [localState, setLocalState] = React.useState({
    feed: [{
      userId: "welington.martins",
      debug: "sadsaiudbsadsad",
      time: new Date(),
    }],
  })

  const handleMessageAdd = message => {
    //socket.emit('message', 'aaaaaaaaaaaaaaaa')
    setLocalState(oldState => ({
      feed: [message, ...oldState.feed]
    }))
  };

  const renderBody = (debug) => {
    try {
      const data = JSON.parse(debug)
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return debug;
    }
  }

  React.useEffect(()=>{

    const connection = require('../lib/socket').default;
    const init = new connection('appLogs').connect();
    setSocket(init);
    const subscribe = init.subscribe('appLogs');
    subscribe.on('appLogs', handleMessageAdd);
    return ()=> {
      socket.close();
    }
  }, [])
    return (
      <>
        <Head title="Home" />
          <Nav />
      <List>
      {localState.feed.map(item => (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`http://coredata.sanesul.ms.gov.br/api/funcionarios/${item.userId}/foto`} />
        </ListItemAvatar>
        <ListItemText
          primary={item.userId}
          secondary={
            <div>
              {formatarData(item.time)}
              <pre>
              <Typography
                component="div"
                variant="body3"
                color="textPrimary"
              >
                {renderBody(item.debug)}
              </Typography>
              </pre>
            </div>
          }
        />
      </ListItem>
      ))}
      </List>
      </>
    )
  }
