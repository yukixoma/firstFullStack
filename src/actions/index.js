import * as Types from './../constants/actionTypes';
import apiCaller from './../apiCaller';



export const actFetchAllMangaFromServer = () => {
    return (dispatch) => {
        return apiCaller("GET", "/fetchMangaList", null, (res, err) => {
            if(err) throw err;
            let allManga = JSON.stringify(res.data);
            localStorage.setItem("allManga",allManga);
            dispatch(actFetchAllManga(res.data));
        })
    }
}

const actFetchAllManga = mangas => {
    return {
        type: Types.FETCH_ALL_MANGA,
        mangas
    }
}

export const actFetchMangaInfo = id => {
    return {
        type: Types.GET_MANGA_INFO,
        id
    }
}

export const actFetchUserUploadedManga = username => {
    return {
        type: Types.GET_USER_UPLOADED_MANGA,
        username
    }
}
