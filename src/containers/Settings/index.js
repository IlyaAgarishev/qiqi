import React from 'react';
import './index.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.open) {
      this.settings.style.display = 'block';
    } else {
      this.settings.style.display = 'none';
    }
  }

  shouldComponentUpdate(props) {
    if (props.open) {
      this.settings.style.display = 'block';
      setTimeout(() => {
        this.settings.style.opacity = '1';
      }, 10);
    } else {
      this.settings.style.opacity = '0';
      setTimeout(() => {
        this.settings.style.display = 'none';
      }, 300);
    }
    return true;
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
