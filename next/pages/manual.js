import React from 'react';
import { Typography } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Head from '../components/head';
import Nav from '../components/nav';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function ManualPage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <>
      <Head title="Manual" />
      <Nav />
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Javascript" {...a11yProps(0)} />
        <Tab label="C#" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography
            component="pre"
            style={{
              backgroundColor: '#f2f2f2',
              overflow: 'scroll',
              padding: 15,
            }}

          >
            {`
            const logInfo = async (usuario, dados) => {
              const request = await fetch('http://localhost:3333/api/log', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userId: usuario,
                  appName: 'NOME-DA-APLICACAO',
                  debug: dados
                })
              })
            };

          e chame: logInfo('welington.martins', { teste: 'teste' })
        `}
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography
            component="pre"
            style={{
              backgroundColor: '#f2f2f2',
              overflow: 'scroll',
              padding: 15,
            }}
          >
            {`
            Utils/Logger.cs

            namespace SUA_APLICACAO.Utils
            {
                public class Logger
                {
                    public static async System.Threading.Tasks.Task Enviar(string userName, string appName, string dados)
                    {
                        var values = new Dictionary<string, string>{
                            { "userId", userName },
                            { "appName", appName },
                            { "debug", dados }
                        };
                        HttpClient client = new HttpClient();
                        var content = new FormUrlEncodedContent(values);
                        var response = await client.PostAsync("http://localhost:3333/api/log", content);
                        var responseString = await response.Content.ReadAsStringAsync();
                    }
                }
            }

             Para usar:

             await Logger.Enviar("welington.martins", "SUA_APLICACAO", "Ola");
            `}
          </Typography>
        </TabPanel>
      </SwipeableViews>
    </>
  );
}
