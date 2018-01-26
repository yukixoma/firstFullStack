import * as Types from './../constants/actionTypes';
let initialState = [];



const Manga = (state = initialState, action) => {
    switch(action.type) {
        case Types.FETCH_ALL_MANGA:
            state = action.mangas;
            return state;
        default: return state;
    }
}

export default Manga;