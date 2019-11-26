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
            return {
                ...state,
                indexLatest: action.prevIdx,
                index: action.pageIdx
            }
        default:
            return state;
    }
}

export default viewsReducer