import Immutable from 'immutable'
import update from 'react-addons-update'

var initialState = Immutable.Map({
    modInfo:{
        name:'',
        script:'',
        url:'',
        path:'',
        progressInfo:[{
            text:'',
            progress:''
        }]
    }
});


export default function selectMod (state = initialState.toJS(), action) {
  switch(action.type) {
    case 'selectMod':
        console.log('mod selected')
        return update(state, {
                        modInfo:{
                            name:{$set: action.name},
                            script: {$set: action.script},
                            url: {$set: action.url}
                        }
                    })
    case 'selectDirectory':
        console.log('OpenRA directory selected')
        return update(state, {
                        modInfo:{
                            path:{$set: action.path}
                        }
                    })
    case 'progressInfo':
        return {
             progressInfo:[
              ...state.progressInfo,
              {
                text: action.text,
                progress: action.progress
              }
            ]
            }
    default:
        return state
  }
}
