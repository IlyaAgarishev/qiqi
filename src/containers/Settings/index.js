import React from 'react';
import './index.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.open ? <div className="settings">got me going crazy</div> : null;
  }
}

export default Settings;
