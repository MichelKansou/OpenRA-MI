import React from 'react'
import ReactDOM from 'react-dom'
const shell = require('electron').shell;

export default class driverView extends React.Component {
    render() {
        return (
          <div className="driverView">
              <div className="container">
                  <p>Sorry, this program requires mono and p7zip to install mods properly.</p>
                  <p>Visit <a onClick={e => {shell.openExternal('http://www.mono-project.com/download/')}}>Mono</a> and install mono framework <i className="big smile icon"></i></p>
                  <ul>
                      <li>
                          <p>Install p7zip for MacOS with <a onClick={e => {shell.openExternal('http://brew.sh')}}>homebrew</a> by running the command 'brew install p7zip'</p>
                      </li>
                      <li>
                          <p>Install p7zip for Linux by running the command 'sudo apt-get install p7zip'</p>
                      </li>
                  </ul>
              </div>
          </div>
        );
    }
}
