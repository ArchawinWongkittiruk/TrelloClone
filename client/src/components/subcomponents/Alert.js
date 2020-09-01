import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlertMUI from '@material-ui/lab/Alert';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <AlertMUI severity={alert.alertType} key={alert.id}>
      {alert.msg}
    </AlertMUI>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
