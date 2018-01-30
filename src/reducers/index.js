import {combineReducers} from 'redux';
import Home from './Home';
import Detail from './Detail';

const appReducers = combineReducers({
    Home,
    Detail
});

export default appReducers;