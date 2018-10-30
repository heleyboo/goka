//
// Description: This component will render a map and direction
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//
import React, { Component } from 'react';
import MapContainer from './MapContainer';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {
    getCurrentLocation,
} from '../actions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyAoOJzFf4GbCO1FNxgMb7IGzcouL0CsUyQ';
import flagCurentLocationImg from '../../../resources/images/flag-kara.png';
import flagKaraokeImg from '../../../resources/images/flag-home.png';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
const DEFAULT_PADDING = { top: 80, right: 40, bottom: 40, left: 40 };


class MapDirection extends Component {

    componentDidMount() {
        let {origin} = this.props;
        let destination = this.props.navigation.state.params.destination;
        if (origin && destination) {
            let arrCoord = [
                {
                    latitude: origin.latitude,
                    longitude: origin.longitude
                },
                {
                    latitude: destination.latitude,
                    longitude: destination.longitude
                }
            ];
            this._map._component.fitToCoordinates(
                arrCoord
                , { edgePadding: DEFAULT_PADDING, animated: true }); 
        }
    }

    render() {
        let {origin} = this.props;
        let destination = this.props.navigation.state.params.destination;
        let karaokeName = this.props.navigation.state.params.karaokeName;
        return (
            <MapView.Animated ref={component => this._map = component}
                        //provider={PROVIDER_GOOGLE}
                        style={styleMap.map}
                        showsUserLocation
                    >
                {
                    origin && destination &&
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="#4286f4"
                        lineJoin="bevel"
                    />
                }
                {
                    destination.latitude && destination.longitude &&
                    <Marker
                        coordinate={{ "latitude": destination.latitude, "longitude": destination.longitude }}
                        title={karaokeName}
                        image={flagKaraokeImg}
                        key="1"
                    />
                }
            </MapView.Animated>
        );
    }
}

const styleMap = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
}

const mapStateToProps = state => {
    let userLocation = state.karaokeReducer.userLocation;
    return {
        origin: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
        },
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCurrentLocation() {
            dispatch(getCurrentLocation());
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapDirection);
