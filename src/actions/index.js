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

export const actFetchMangaInfoFromServer = (id) => {
    return (dispatch) => {
        return apiCaller("GET","/fetchMangaInfo/"+id,null,(res,err)=> {
            if(err) throw err;
            dispatch(actFetchMangaInfo(res.data));
        })
    }
}

const actFetchAllManga = (mangas) => {
    return {
        type: Types.FETCH_ALL_MANGA,
        mangas
    }
}
const actFetchMangaInfo = (manga) => {
    return {
        type: Types.GET_MANGA_INFO,
        manga
    }
}