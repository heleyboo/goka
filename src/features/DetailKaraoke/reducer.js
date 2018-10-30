import {
    GET_DETAIL_KARAOKE,
    GET_DETAIL_KARAOKE_SUCCESS,
    GET_DETAIL_KARAOKE_FAIL
} from './actionTypes';

export default function detailKaraoke(state = { karaoke: [] }, action) {
    switch (action.type) {
        case GET_DETAIL_KARAOKE:
            return { ...state, loading: true };
        case GET_DETAIL_KARAOKE_SUCCESS:
            return { ...state, loading: false, karaoke: action.payload.data.data };
        case GET_DETAIL_KARAOKE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching detail karaoke'
            };
        default:
            return state;
    }
}
