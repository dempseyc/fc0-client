export const NEW_CURR_PAGE = 'NEW_CURR_PAGE';
// export const CHANGE_NUM_PAGES = 'CHANGE_NUM_PAGES';

export function newCurrPage (pageIdx, prevIdx, calledFrom) {
    return {
        type: NEW_CURR_PAGE,
        pageIdx,
        prevIdx,
        calledFrom
    }
}

// export function changeNumPages (numPages) {
//     return {
//         type: CHANGE_NUM_PAGES,
//         numPages
//     }
// }