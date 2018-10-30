import actionTypes from './actionTypes';
import axios from 'axios';
const apiClient = axios.create({
    baseURL: 'http://api.goka.online',
    responseType: 'json',
    headers: {
      'Authorization': 'Bearer YmI3OGJhZjdhMGI1ZTY5NzE1MjRjMTRmNWJkMzYxYjgzNTI5MWJkMTZiNGRiNTBlNTZiMGVkNTdlOTIxZDUwYw'
    }
});

import { PermissionsAndroid, Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

export function searchNearest() {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(getNearest([], position.coords, 1));
            },
            (error) => {
                console.log(error);
                dispatch(getCurrentLocationFail());
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    }
}

export function updateNearestPage(page) {
    return {
        type: actionTypes.UPDATE_NEAREST_PAGE,
        payload: {
            nearestPage: page
        }
    }
}

export function watchLocation() {
    return (dispatch) => {
        navigator.geolocation.watchPosition(
            (position) => {
                dispatch(getCurrentLocationSuccess(position.coords));
                dispatch(getNearest([], position.coords, 1));
                dispatch(searchKaraokies("", position.coords));
            },
            (error) => {
                dispatch(getCurrentLocationFail());
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    }
}

export function getNearestKaraokies(currentLocation, page) {
    let lat = currentLocation.latitude;
    let lng = currentLocation.longitude;
    let distance = 10;
    let per_page = 30;
    let query = `lat=${lat}&lng=${lng}&distance=${distance}&per_page=${per_page}&page=${page}`;
    return {
        type: actionTypes.GET_NEARESTKARAOKIES,
        payload: {
            request: {
                url: `api/karaokies?${query}`
            }
        }
    };
}

export function loadNearestKaraokies() {
    return {
        type: actionTypes.GET_KARAOKIES
    }
}

export function loadNearestKaraokiesSuccess(data) {
    console.log(data);
    return {
        type: actionTypes.GET_NEARESTKARAOKIES_SUCCESS,
        payload: data
    }
}

export function loadNearestKaraokiesFail() {
    return {
        type: actionTypes.GET_NEARESTKARAOKIES_FAIL
    }
}

export function getNearest(nearestKaraokies, currentLocation, page) {
    
    let lat = currentLocation.latitude;
    let lng = currentLocation.longitude;
    let distance = 10;
    let per_page = 10;
    let query = `lat=${lat}&lng=${lng}&distance=${distance}&per_page=${per_page}&page=${page}`;

    return (dispatch) => {
        apiClient.get(`/api/karaokies?${query}`)
        .then(function(response) {
            dispatch(updateNearestPage(page));
            if (page > 1 && nearestKaraokies.length > 0) {
                let moreNearestKaraokies = response.data.data.result;
                let data = nearestKaraokies.concat(moreNearestKaraokies);
                dispatch(loadNearestKaraokiesSuccess(data))
            } else {
                dispatch(loadNearestKaraokiesSuccess(response.data.data.result))
            }
        })
        .catch(function(error) {
            dispatch(loadNearestKaraokiesFail());
        });
    }
}

export function getCurrentLocation(map) {
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(getCurrentLocationSuccess(position.coords));
                dispatch(searchKaraokies("", position.coords));
            },
            (error) => {
                console.log(error);
                dispatch(getCurrentLocationFail());
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        );
    }
}

export function getCurrentLocationSuccess(coords) {
    return {
        type: actionTypes.GET_CURRENT_LOCATION_SUCCESS,
        payload: {
            coords: coords
        }
    }
}

export function getCurrentLocationFail() {
    return {
        type: actionTypes.GET_CURRENT_LOCATION_FAIL
    }
}

export function requestPermission() {
    return dispatch => {
        requestLocationPermission()
            .then(success => {
                if (success) {
                    dispatch(requestPermissionSuccess());
                }
                dispatch(requestPermissionError());
            })
            .catch(err => {
                dispatch(requestPermissionError());
            });
    }
}

export function requestPermissionSuccess() {
    return {
        type: 'NO',
    }
}

export function requestPermissionError() {
    return {
        type: 'NO',
    }
}


async function requestLocationPermission() {
    let sucess = false;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Goka Location Permission',
                'message': 'Goka App needs access to your location'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            sucess = true;
        }
    } catch (err) {
        console.warn(err)
    }
    return sucess;
}

export function updateSearchQuery(searchQuery) {
    return {
        type: actionTypes.UPDATE_SEARCH_QUERY,
        payload: {
            searchQuery: searchQuery
        }
    }
}

export function updateSearchType(searchType) {
    return {
        type: actionTypes.UPDATE_SEARCH_TYPE,
        payload: {
            searchType: searchType
        }
    }
}

export function searchKaraokies(searchQuery, userLocation) {
    let query = "";
    let per_page = 50;
    if (userLocation.latitude && userLocation.longitude) {
        query += `lat=${userLocation.latitude}&lng=${userLocation.longitude}`
    }

    if (searchQuery !== "") {
        query += `&search=${searchQuery}`;
    }

    query += `&per_page=${per_page}`

    return {
        type: actionTypes.SEARCH_LIST_KARAOKE,
        payload: {
            request: {
                url: `api/karaokies?${query}`
            }
        }
    };
}

export function getKaraokies() {
    return {
        type: actionTypes.GET_KARAOKIES
    }
}