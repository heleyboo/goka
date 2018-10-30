import actionTypes from './actionTypes';
import YTSearch from "youtube-api-search";
const API_KEY = "AIzaSyDKVvt4RJoHaiLrMPb7Dvxk8KDH0ng6zD8";
export function getSongDetail(songName) {
    //Get information from Youtube
    return dispatch => {
        var songs = [];
        var keyword = "karaoke " + songName;
        YTSearch({ key: API_KEY, term: keyword, maxResults: 5 }, videos => {
            dispatch(getSongDetailSuccess(videos));
        });

    }
}
export function getSongDetailSuccess(songs) {
    return {
        type: actionTypes.GET_SONG_FROM_YOUTUBE,
        payload: {
            songs: songs
        }
    }
}