import {
    GET_DETAIL_KARAOKE,
} from './actionTypes';

export function detailKaraoke(id) {
    console.log("Got id: " + id);
    return {
        type: GET_DETAIL_KARAOKE,
        payload: {
            request: {
                url: `/api/karaoke/${id}`
            }
        }
    };
}