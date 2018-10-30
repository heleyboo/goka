import actionTypes from './actionTypes';
import commonTypes from '../../constants/commonTypes';
export default function songReducer(state = {
    songs: [],
    searchKeywork: "",
    songType: commonTypes.KARA_TYPE_SONG_NAME,
    page: 1
}, action) {
    switch (action.type) {
        case actionTypes.GET_SONG_LIST_SUCCESS:
            return {
                ...state,
                songs: action.payload.songs
            }
        case actionTypes.SET_SEARCH_QUERY:
            return {
                ...state,
                songType: action.payload.songType,
                searchKeywork: action.payload.searchKeywork
            }
        case actionTypes.UPDATE_PAGE:
            return {
                ...state,
                page: action.payload.page
            }
        case actionTypes.UPDATE_FAV_SONG_SUCCESS:
        default:
            return state;
    }
}