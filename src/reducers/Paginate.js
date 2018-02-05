import * as Types from './../constants/actionTypes';


const Paginate = (state =[], action) => {
    switch (action.type) {
        case Types.PAGINATE:
            state = [];
            let { arrayPage, itemPerPage, page } = action;
            for (let i = (page - 1) * itemPerPage; i < arrayPage.length && i < (page * itemPerPage); i++) {
                state.push(arrayPage[i]);
            }
            return state;
        default: return state;
    }
}

export default Paginate;