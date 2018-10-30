//
// Description: This component is for searching places by place name
// and by street name
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Icon, Text, Item, Input, View } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Dimensions, Platform, StyleSheet } from 'react-native';

import {
    requestPermission,
    getCurrentLocation,
    updateSearchQuery,
    updateSearchType,
    searchKaraokies,
    watchLocation
} from '../actions';
import flagKaraokeImg from '../../../resources/images/flag-home.png';
import styles from './style';
import MapView, { Marker } from 'react-native-maps';
import CustomCallout from './CustomCallout';

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

class SearchPlaces extends Component {

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.props.requestPermissions();
        }
        this.props.getCurrentLocation(this._map);
        this.props.watchLocation();
    }

    onChangeSearchType = (searchType) => {
        this.props.updateSearchType(searchType);
    }

    onSearchTextChange = (text) => {
        this.props.searchKaraokies(text, this.props.userLocation);
    }

    onClickSearchButton = () => {
        this.props.navigation.navigate('SearchResult');
    }

    onDetailButtonPressed(karaoke) {
        this.props.navigation.navigate('DetailKaraoke', {
            karaoke: karaoke
        });
    }

    onDirectionButtonPressed(karaoke) {
        var destination = karaoke.address;
        if (karaoke.lat && karaoke.lng) {
            destination = { "latitude": karaoke.lat, "longitude": karaoke.lng };
        }
        this.props.navigation.navigate('MapDirection', {
            destination: destination,
            karaokeName: karaoke.name
        });
    }

    componentDidUpdate() {
        const { karaokies } = this.props;
        if (karaokies) {
            let arrCoord = karaokies.map(karaoke => ({
                latitude: karaoke.lat,
                longitude: karaoke.lng
            }));
            if (arrCoord.length > 0) {
                this._map._component.fitToCoordinates(
                    arrCoord
                    , { edgePadding: DEFAULT_PADDING, animated: true }); 
            }
        }
    }

    render() {
        const { userLocation, karaokies } = this.props;

        return (
            <Container>
                <View style={[styles.searchForm]}>
                    <Grid>
                        <Col size={80}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="Nhập tên quán, tên đường ..."
                                    onChangeText={(text) => this.onSearchTextChange(text)} />
                            </Item>
                        </Col>
                        <Col size={20}>
                            <Button transparent onPress={() => this.onClickSearchButton()}>
                                <Text>Tìm</Text>
                            </Button>
                        </Col>
                    </Grid>
                </View>

                <View style={styleMap.container}>
                    <MapView.Animated ref={component => this._map = component}
                        style={styleMap.map}
                        showsUserLocation
                        showsMyLocationButton
                    >
                        {
                            karaokies && karaokies.map(karaoke => (
                                <Marker
                                    coordinate={{ "latitude": karaoke.lat, "longitude": karaoke.lng }}
                                    title={karaoke.name}
                                    image={flagKaraokeImg}
                                    key={karaoke.id}
                                    onCalloutPress={() => this.onDetailButtonPressed(karaoke)}
                                    >
                                    {/*<CustomCallout 
                                    karaoke={karaoke} 
                                    onDirectionButtonPressed={() => this.onDirectionButtonPressed(karaoke)}
                                    onDetailButtonPressed={() => this.onDetailButtonPressed(karaoke)}/>*/}
                                </Marker>
                            ))
                        }

                    </MapView.Animated>
                </View>
            </Container>
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
    let searchQuery = state.karaokeReducer.searchQuery;
    let searchType = state.karaokeReducer.searchType;

    return {
        userLocation: userLocation,
        searchQuery: searchQuery,
        searchType: searchType,
        karaokies: state.karaokeReducer.karaokies
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestPermissions() {
            dispatch(requestPermission());
        },
        getCurrentLocation(map) {
            dispatch(getCurrentLocation(map));
        },
        updateSearchQuery(searchQuery) {
            dispatch(updateSearchQuery(searchQuery));
        },
        updateSearchType(searchType) {
            dispatch(updateSearchType(searchType));
        },
        searchKaraokies(searchQuery, userLocation) {
            dispatch(searchKaraokies(searchQuery, userLocation));
        },
        watchLocation() {
            dispatch(watchLocation());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaces);