//
// Description: This component will render a map container
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Dimensions, StyleSheet, View } from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.851737713857673;
const LONGITUDE = 106.67365679469125;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const initialRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}
export default class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          region: initialRegion,
        };
    }
    _onLayout = () => { setTimeout( () => {
        console.log("On Layout");
        var arrCoord = [];
        this.props.children.forEach(element => {
            if(typeof element != undefined && typeof element["type"] != "undefined" && typeof element["type"]["displayName"] != "undefined" && element["type"]["displayName"] === "MapViewDirections") {
                arrCoord.push({ latitude: element["props"]["destination"]["latitude"], longitude: element["props"]["destination"]["longitude"] });
                arrCoord.push({ latitude: element["props"]["origin"]["latitude"], longitude: element["props"]["origin"]["longitude"] });
            }
        });
        if(arrCoord.length == 0) {
            this.props.children.forEach(element => {
                if(typeof element != undefined && typeof element["props"] != "undefined" && typeof element["props"]["title"] != "undefined" && element["props"]["title"] === "Vị trí của bạn") {
                    console.log(element["props"]["coordinate"]["latitude"]);
                    this.map.animateToRegion({
                        latitude: element["props"]["coordinate"]["latitude"],
                        longitude: element["props"]["coordinate"]["longitude"],
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }, 10);
                    return;
                }
            });

        } else { 
            this.map.fitToCoordinates(
                arrCoord
                , { edgePadding: DEFAULT_PADDING, animated: true }); 
        }

    }, 2000 ); }
    render() {
        
        return (
            <View style={styles.container}>
                <MapView
                    ref={ref => { this.map = ref; }}
                    style={styles.map}
                    initialRegion={initialRegion}
                    onLayout={this._onLayout}
                >
                {this.props.children}
                </MapView>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
}