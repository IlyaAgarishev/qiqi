import React from 'react';
import './index.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.settings.style.opacity = '1';
    }, 10);
  }

  render() {
    return (
      <div className="settings" ref={ref => (this.settings = ref)}>
        got me going crazy
      </div>
    );
  }
}

export default Settings;
