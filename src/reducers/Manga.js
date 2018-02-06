import * as Types from './../constants/actionTypes';

let allManga = localStorage.getItem("allManga");
let initialState = allManga ? JSON.parse(allManga) : [];
initialState = initialState.sort((a, b) => {
    return (a.updatedAt > b.updatedAt) ? -1 : ((a.updatedAt < b.updatedAt) ? 1 : 0);
});



const Manga = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ALL_MANGA:
            state = initialState;
            return state;
        case Types.GET_MANGA_INFO:
            state = initialState;
            state = state.filter(e => {
                return e._id === action.id;
            });
            return state;
        case Types.GET_USER_UPLOADED_MANGA:
            state = initialState;
            state = state.filter(e => {
                return e.username === action.username;
            })
            return state;
        default: return state;
    }
}

export default Manga;