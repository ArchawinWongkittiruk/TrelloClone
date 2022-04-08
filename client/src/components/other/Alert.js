import React from 'react';
import AlertMUI from '@material-ui/lab/Alert';
import withStore from '../../Store/withStore';

export const Alert = withStore(['alert'],({store, props}) => {
  const alerts = store.state.alertState

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <AlertMUI severity={alert.alertType} key={alert.id}>
        {alert.msg}
      </AlertMUI>
    ))
  );
})

export default Alert;
