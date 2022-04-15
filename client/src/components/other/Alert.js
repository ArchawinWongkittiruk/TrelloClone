import React, {useContext} from 'react';
import AlertMUI from '@material-ui/lab/Alert';
import { AuthContext } from '../../contexts/AuthStore';

const Alert = () => {
  const { alert } = useContext(AuthContext);
  return (
    alert !== null &&
    alert.length > 0 &&
    alert.map((alert) => (
      <AlertMUI severity={alert.alertType} key={alert.id}>
        {alert.msg}
      </AlertMUI>
    ))
  );
};

export default Alert;
