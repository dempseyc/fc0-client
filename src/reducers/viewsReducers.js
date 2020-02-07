import {
    NEW_CURR_PAGE
    // ,CHANGE_NUM_PAGES
} from '../actions/viewsActions';

const initialState = {
    numPages: 5,
    index: 0,
    indexLatest: 0,
    calledFrom: ''
  }

function viewsReducer(state=initialState, action) {
    switch (action.type) {
        case NEW_CURR_PAGE:
            return {
                ...state,
                indexLatest: action.prevIdx,
                index: action.pageIdx,
                calledFrom: action.calledFrom
            }
        default:
            return state;
    }
}

export default viewsReducer