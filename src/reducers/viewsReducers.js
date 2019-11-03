import {
    NEW_CURR_PAGE
    // ,CHANGE_NUM_PAGES
} from '../actions/viewsActions';

const initialState = {
    numPages: 5,
    index: 1,
    indexLatest: 0,
  }

function viewsReducer(state=initialState, action) {
    switch (action.type) {
        case NEW_CURR_PAGE:
            let nextState = { 
                indexLatest: action.prevIdx,
                index: action.pageIdx,
            };
            return Object.assign({},state,nextState);
        default:
            return state;
    }
}

export default viewsReducer