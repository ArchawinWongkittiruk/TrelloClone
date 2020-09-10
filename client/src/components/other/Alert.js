import React from 'react';
import { useSelector } from 'react-redux';
import AlertMUI from '@material-ui/lab/Alert';

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <AlertMUI severity={alert.alertType} key={alert.id}>
        {alert.msg}
      </AlertMUI>
    ))
  );
};

export default Alert;
