import React from 'react'
import ReactDOM from 'react-dom'
const exec = require('child_process').exec;
var sudo = require('sudo-prompt');
var options = {
  name: 'Admin'
};

export default class ra2_construction extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
          buildingProgress: null,
          progressMessage: null,
          errorDescription: null,
          errorBar: null
        };
    }
    buildingRA2(){
        const {modInfo, download_RA2_Content} = this.props;
        console.log('Start Building RA2 Mod');
        this.setState({buildingProgress: <div className="downloading_RA2">Downloading RA2 Mod...<i className="spinner loading icon"></i></div>});
        var run_script = sudo.exec('bash '+rootPath+'/app/js/scripts/+'+modInfo.script+' '+modInfo.path+' '+download_RA2_Content, options, function(error, stdout, stderr) {
            if(error){
                console.log(error);
                this.setState({ errorDescription: error });
            }
            console.log(stderr);
            console.log(stdout);
            this.setState({ errorDescription: stderr });
            this.setState({errorBar: <div className="ui negative message"><div className="header">error: {this.state.errorDescription}</div></div>});
            this.setState({buildingProgress: <div className="building_RA2">RA2 - Construction complete<i className="circular inverted green checkmark icon"></i></div>});
        }.bind(this));
    }
    render() {
        return (
          <div className="ra2_constructionView">
                  {this.state.buildingProgress}
                  <div className="errorMessage">
                      {this.state.errorBar}
                  </div>
          </div>
        );
    }
}
