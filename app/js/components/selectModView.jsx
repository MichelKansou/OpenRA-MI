import React from 'react'
import ReactDOM from 'react-dom'
import SelectDirectoryView from './selectDirectoryView'
import PatchingView from './patchingView'
import { selectMod } from '../actions'

export default class selectModView extends React.Component {
    currentModSelected(e){
        const {dispatch, modInfo} = this.props;
        var index = e.target.selectedIndex;
        if (index) {
            dispatch(selectMod(e.target[index].text, e.target.baseURI, e.target.value))
        }
    }
    render() {
        const {data, modInfo, dispatch} = this.props;
        var modList = data.map((mod, index) =>
            <option key={index} value={mod.script} href={mod.url}>{mod.name}</option>
          )
        return (
            <div className="modSelectionContainer">
              <div className="selectModView">
                  <div className="roundInstruction">1 - Select your mod from github</div>
                  <select onChange={e => {this.currentModSelected(e, this)}}>
                  {modList}
                  </select>
              </div>
              <hr/>
              <SelectDirectoryView dispatch={dispatch} modInfo={modInfo}/>
              <hr/>
              <PatchingView dispatch={dispatch} modInfo={modInfo} />
            </div>
        );
    }
}
