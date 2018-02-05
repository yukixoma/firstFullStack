import {combineReducers} from 'redux';
import Manga from './Manga';
import Detail from './Detail';


const appReducers = combineReducers({
    Manga,
});

export default appReducers;