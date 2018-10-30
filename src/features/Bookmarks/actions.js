import actionTypes from './actionTypes';
import SQLite from 'react-native-sqlite-storage';
let DBObj;
export function getSongList() {
    return dispatch => {
        function errorCB(err) {
            console.log("SQL Error: " + err);
        }

        function openCB() {
            console.log("Database OPENED");
        }
        if(!DBObj)
            DBObj = SQLite.openDatabase({name : "goka.db", createFromLocation : 1}, openCB, errorCB);
        var queryString = `SELECT * FROM vsongs  WHERE vsongs.fav = '1' `;

        
        DBObj.transaction((tx) => {
            tx.executeSql(queryString, [], (tx, results) => {
                var songs = [];
                let rows = results.rows.raw();
                rows.map(row => { songs.push(row) });
                dispatch(getSongListSuccess(songs));
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
        //var db = SQLite.openDatabase({name : "goka.db", createFromLocation : 1}, openCB, errorCB);
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
        type: actionTypes.UPDATE_BOOKMARK_SONG_SUCCESS,
        payload: {
        }
    }
}
export function getSongListSuccess(songs) {
    return {
        type: actionTypes.GET_BOOKMARK_SONG_LIST,
        payload: {
            songs: songs
        }
    }
}



