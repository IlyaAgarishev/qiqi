import React from 'react';
import './index.css';
import settings from '../../img/settings.svg';
import book from '../../img/book.svg';
import WordsTillTest from '../../containers/WordsTillTest';
import Dictionary from '../Dictionary';
import Settings from '../Settings';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDictionary: false,
      openSettings: false
    };
  }

  dictionaryBtnClick = () => {
    this.setState({ openSettings: false });
    this.setState({ openDictionary: !this.state.openDictionary });
  };
  settingsBtnClick = () => {
    this.setState({ openDictionary: false });
    this.setState({ openSettings: !this.state.openSettings });
  };

  render() {
    console.log(this.state.openSettings);
    return (
      <div className="main">
        <div className="header">
          <div className="logo">qiqi</div>
          <img src={settings} alt="" className="settings-img" onClick={this.settingsBtnClick} />
        </div>
        <div className="content">
          <Dictionary open={this.state.openDictionary} />
          <WordsTillTest />
          <Settings open={this.state.openSettings} />
        </div>
        <div className="footer">
          <div className="dictionary-button" onClick={this.dictionaryBtnClick}>
            <img src={book} alt="" className="book" /> Словарь
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
