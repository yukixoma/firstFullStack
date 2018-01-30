import * as Types from './../constants/actionTypes';
let initialState = [];



const Detail = (state = initialState, action) => {
    switch(action.type) {
        case Types.GET_MANGA_INFO:
            state = action.manga;
            return state;
        default: return state;
    }
}

export default Detail;