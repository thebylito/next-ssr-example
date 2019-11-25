import React from 'react';
import Notifications from 'react-notification-system-redux';
import { useSelector } from 'react-redux';
import withRedux from 'lib/redux';

function NotificationContainer() {
  const notifications = useSelector(state => state.notifications);
  return <Notifications notifications={notifications} />;
}

export default withRedux(NotificationContainer);
