import * as Types from './../constants/actionTypes';
import apiCaller from './../apiCaller';



export const actFetchAllMangaFromServer = () => {
    return (dispatch) => {
        return apiCaller("GET", "/fetchMangaList", null, (res, err) => {
            if(err) throw err;
            dispatch(actFetchAllManga(res.data));
        })
    }
}

export const actFetchAllManga = (mangas) => {
    return {
        type: Types.FETCH_ALL_MANGA,
        mangas
    }
}
