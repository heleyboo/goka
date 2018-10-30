import { combineReducers } from 'redux';

import detailKaraoke from './features/DetailKaraoke/reducer';
import karaokeReducer from './features/Karaoke/reducer';
import songReducer from './features/Song/reducer';
import detailSongReducer from './features/DetailSong/reducer';
import favSongReducer from './features/Bookmarks/reducer';

const rootReducer = combineReducers({
    detailKaraoke,
    karaokeReducer,
    songReducer,
    detailSongReducer,
    favSongReducer
})

export default rootReducer;