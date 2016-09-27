import React from 'react'
import ReactDOM from 'react-dom'
import { selectDirectory } from '../actions'
const exec = require('child_process').exec;

export default class selectDirectoryView extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
          downloadProgress: null
        };
    }
    componentDidMount(){
        var input = ReactDOM.findDOMNode(this.refs.customAttributes)
            input.setAttribute('multiple', '')
            input.setAttribute('webkitdirectory', '')
    }
    downloadOpenRA(modInfo, downloadProgress){
        console.log(modInfo.path);
        this.setState({downloadProgress: <div className="downloading_OpenRA">Downloading...<i className="spinner loading icon"></i></div>});
        exec('git clone https://github.com/OpenRA/OpenRA.git '+modInfo.path+'/.', (error, stdout, stderr) => {
          if (error) {
            this.setState({downloadProgress: `exec error: ${error}` });
            return;
          }
        this.setState({downloadProgress: <div className="downloading_OpenRA">Download completed<i className="circular inverted green checkmark icon"></i></div>});
        });
    }
    render() {
        const {dispatch, modInfo} = this.props;
        return (
          <div className="selectDirectoryView">
              <div className="roundInstruction">2 - Select OpenRA directory to download it</div>
              <dl>
                  <dt>
                      Make sure the directory you have selected have read & write permissions.
                  </dt>
                  <dt>
                      If you have already done it just select the directory without clicking on download.
                  </dt>
              </dl>
              <label htmlFor="importDirectory" className="ui icon button directoryInput">
                    <i className="plus icon"></i>
                    Select directory
              </label>
              <input
                  type="file"
                  id="importDirectory"
                  ref='customAttributes'
                  onChange={e => {
                      e.preventDefault();
                      var files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
                      if (files) {
                          dispatch(selectDirectory(files[0].path))
                      }}}
                      />
                  <button className="ui icon button directoryInput" onClick={() => this.downloadOpenRA(modInfo, this.state.downloadProgress)}><i className="download icon"></i>Download OpenRA</button>
                  {this.state.downloadProgress}
          </div>
        );
    }
}
