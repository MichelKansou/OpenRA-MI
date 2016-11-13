import React from 'react'
import ReactDOM from 'react-dom'
import RA2_construction from '../buildings/ra2_construction'
const exec = require('child_process').exec;

export default class patchingView extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
          downloadProgress: null,
          buildingProgress: null,
          errorDescription: null,
          errorBar: null,
          download_Game_Content: false
        };
    }
    handleCheckboxChange(event){
        console.log(event.target.checked);
        this.setState({download_Game_Content: event.target.checked});
    }
    installer(modInfo){
        this.setState({downloadProgress: <div className="downloading_OpenRA">OpenRA - Building ...<i className="spinner loading icon"></i></div>});
        console.log('building OpenRA - make dependencies --directory='+modInfo.path+'/');
        exec('make dependencies --directory='+modInfo.path+'/', (error, stdout, stderr) => {
          if (error) {
            this.setState({
                errorDescription: error,
                errorBar: <div className="ui negative message"><div className="header">error: {this.state.errorDescription}</div></div>
            });
            return;
          }
          console.log('building OpenRA - make --directory='+modInfo.path+'/');
          exec('make --directory='+modInfo.path+'/', (error, stdout, stderr) => {
            if (error) {
                this.setState({
                    errorDescription: error,
                    errorBar: <div className="ui negative message"><div className="header">error: {this.state.errorDescription}</div></div>
                });
                return;
            }
            console.log('building OpenRA - Completed');
            this.setState({downloadProgress: <div className="downloading_OpenRA">OpenRA - Construction complete<i className="circular inverted green checkmark icon"></i></div>});
            this.refs.ra2_construction.buildingRA2();
          });
        });
    }
    render() {
        const {dispatch, modInfo} = this.props;
        return (
          <div className="patchingView">
              <div className="roundInstruction">3 - Start installing your mod</div>
              <button className="ui icon button directoryInput" onClick={this.installer.bind(this, modInfo)}><i className="wizard icon"></i>Install Mod</button>
              <div className="ui checkbox">
                  <RA2_construction ref="ra2_construction" modInfo={modInfo} download_RA2_Content={this.state.download_Game_Content}/>
                  <input type="checkbox" onChange={e => {this.handleCheckboxChange(e,this)}} name="ra2_content"/>
                  <label>Install RA2 Content</label>
              </div>
              <div className="ora_progress">
                  {this.state.downloadProgress}
                  <div className="errorMessage">
                      {this.state.errorBar}
                  </div>
              </div>
          </div>
        );
    }
}
