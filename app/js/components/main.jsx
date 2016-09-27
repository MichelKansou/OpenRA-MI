import React from 'react'
import { connect } from 'react-redux'
import SelectModView from './selectModView'
import DriverView from './driverView'
var CommandExists = require('command-exists');


export class Main extends React.Component {
    constructor(props) {
    super(props);
        this.state = {
          checkMonoView: false,
          check7zView: false,
          data: reduxDataBase
        };
    }
    componentWillMount(){
        CommandExists('mono', function(err, monoCommandExists) {

            if(monoCommandExists) {
                // proceed confidently knowing this command is available
                console.log("mono is installed");
                this.setState({checkMonoView: true});
            }else {
                console.log("mono command not found");
                this.setState({checkMonoView: false});
            }

        }.bind(this));
        CommandExists('7z', function(err, p7zCommandExists) {

            if(p7zCommandExists) {
                // proceed confidently knowing this command is available
                console.log("p7zip is installed");
                this.setState({check7zView: true});
            }else {
                console.log("7z command not found");
                this.setState({check7zView: false});
            }

        }.bind(this));
    }
    render() {
        const {dispatch, modInfo} = this.props;
        var mainView;
        if ( this.state.checkMonoView == true && this.state.check7zView == true ){
            mainView =(
                <SelectModView data={this.state.data} modInfo={modInfo} dispatch={dispatch}/>
            );
        }else {
            mainView = <DriverView/>;
        }
        return (
            <div className="mainView">
                {mainView}
            </div>
       );
    }
}

function mapStateToProps(state) {
  return {
    modInfo: state.selectMod.modInfo
  }
}
export default connect(mapStateToProps)(Main)
