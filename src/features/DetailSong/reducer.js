import actionTypes from './actionTypes';
export default function detailSongReducer(state = {
    songs: []
}, action) {
    switch (action.type) {
        case actionTypes.GET_SONG_FROM_YOUTUBE:
            return {
                ...state,
                songs: action.payload.songs
            }
        default:
            return state;
    }
}
