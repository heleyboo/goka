import actionTypes from './actionTypes';

export default function karaokeReducer(state = {
    nearestKaraokies: [],
    karaokies: [],
    userLocation: {},
    searchQuery: "",
    searchType: 1,
    nearestPage: 1
}, action) {
    switch (action.type) {
        case actionTypes.GET_NEARESTKARAOKIES:
            return { ...state, loadingNearest: true };
        case actionTypes.GET_NEARESTKARAOKIES_SUCCESS:
            return { ...state, loadingNearest: false, nearestKaraokies: action.payload };
        case actionTypes.GET_NEARESTKARAOKIES_FAIL:
            return {
                ...state,
                loadingNearest: false,
                error: 'Error while fetching karaokies'
            };
        case actionTypes.SEARCH_LIST_KARAOKE:
            return { ...state, loading: true };
        case actionTypes.SEARCH_LIST_KARAOKE_SUCCESS:
            return { ...state, loading: false, karaokies: action.payload.data.data.result };
        case actionTypes.SEARCH_LIST_KARAOKE_FAIL:
            return {
                ...state,
                loading: false,
                error: 'Error while fetching karaokies'
            };
        case actionTypes.GET_CURRENT_LOCATION_SUCCESS:
            return {
                ...state,
                userLocation: action.payload.coords
            }
        case actionTypes.GET_CURRENT_LOCATION_FAIL:
            return {
                ...state,
                error: 'Can not get user location'
            }
        case actionTypes.UPDATE_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload.searchQuery
            }
        case actionTypes.UPDATE_SEARCH_TYPE:
            return {
                ...state,
                searchType: action.payload.searchType
            }
        case actionTypes.UPDATE_NEAREST_PAGE:
            return {
                ...state,
                nearestPage: action.payload.nearestPage
            }
        default:
            return state;
    }
}