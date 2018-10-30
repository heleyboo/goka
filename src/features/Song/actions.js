import actionTypes from './actionTypes';
import SQLite from 'react-native-sqlite-storage';
import {
    utf8convert
} from '../../util/util.js';
let DBObj;
export function getSongList(currentSongList, songType, searchKeywork, page) {
    console.log(songType);
    console.log(searchKeywork);
    return dispatch => {
        dispatch(setSearchQuery(songType, searchKeywork));
        function errorCB(err) {
            console.log("SQL Error: " + err);
        }

        function openCB() {
            console.log("Database OPENED");
        }
        if(!DBObj)
            DBObj = SQLite.openDatabase({name : "goka.db", createFromLocation : 1}, openCB, errorCB);
        var queryString = `SELECT * FROM vsongs `;
        if (typeof searchKeywork != 'undefined' && searchKeywork !== "") {
            console.log(searchKeywork);
            searchKeywork = utf8convert(searchKeywork);
            searchKeywork = searchKeywork.toLowerCase();
            queryString += ` WHERE vsongs MATCH 'keysearch:${searchKeywork} OR code:${searchKeywork}'`;
        }

        queryString += " LIMIT 5";

        if (page >= 1) {
            let offset = (page - 1) * 5;
            queryString += ` OFFSET ${offset}`
        }

        DBObj.transaction((tx) => {
            tx.executeSql(queryString, [], (tx, results) => {
                var songs = [];
                let rows = results.rows.raw();
                rows.map(row => { songs.push(row) });
                dispatch(updatePage(page));
                if (page > 1 && currentSongList.length > 0) {
                    let moreSongs = songs;
                    let newSongs = currentSongList.concat(moreSongs);
                    dispatch(getSongListSuccess(newSongs));
                } else {
                    dispatch(getSongListSuccess(songs));
                }
            });
        });
        
    }
}
export function updateFavorite(id, isFav) {
    return dispatch => {
        function errorCB(err) {
            console.log("SQL Error: " + err);
        }

        function openCB() {
            console.log("Database OPENED");
        }
        if(!DBObj)
            DBObj = SQLite.openDatabase({name : "goka.db", createFromLocation : 1}, openCB, errorCB);
        var queryString = `UPDATE vsongs  SET fav = '${isFav}' WHERE id = '${id}'`;
        DBObj.transaction((tx) => {
            tx.executeSql(queryString, [], (tx, results) => {
                dispatch(updateFavSongSuccess());
            });
        });
    }
}
export function updateFavSongSuccess() {
    return {
        type: actionTypes.UPDATE_FAV_SONG_SUCCESS,
        payload: {
        }
    }
}
export function getSongListSuccess(songs) {

    return {
        type: actionTypes.GET_SONG_LIST_SUCCESS,
        payload: {
            songs: songs
        }
    }
}

export function setSearchQuery(songType, searchKeywork) {
    return {
        type: actionTypes.SET_SEARCH_QUERY,
        payload: {
            songType: songType,
            searchKeywork: searchKeywork
        }
    }
}

export function updatePage(page) {
    return {
        type: actionTypes.UPDATE_PAGE,
        payload: {
            page: page
        }
    }
}



