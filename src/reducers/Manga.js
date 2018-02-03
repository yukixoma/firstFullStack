import * as Types from './../constants/actionTypes';

let allManga = localStorage.getItem("allManga");
let initialState = allManga? JSON.parse(allManga) : [];



const Manga = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_ALL_MANGA:
            state = action.mangas;
            return state;
        case Types.GET_MANGA_INFO:
            state = state.filter(e=> {
                return e._id === action.id;
            });
            return state;
        case Types.GET_USER_UPLOADED_MANGA: 
            state = state.filter(e => {
                return e.username === action.username;
            })
            return state;
        default: return state;
    }
}

export default Manga;