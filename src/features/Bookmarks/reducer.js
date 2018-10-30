import actionTypes from './actionTypes';
export default function favSongReducer(state = {
    songs: []
}, action) {
    switch (action.type) {
        case actionTypes.GET_BOOKMARK_SONG_LIST:
            return {
                ...state,
                songs: action.payload.songs
            }
        case actionTypes.UPDATE_BOOKMARK_SONG_SUCCESS:
        default:
            return state;
    }
}