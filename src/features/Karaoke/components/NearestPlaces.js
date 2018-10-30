//
// Description: This component will render list
// karaoke nearest user's location
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//

import React, { Component } from 'react';
import KaraokeList from './KaraokeList';
import { connect } from 'react-redux';
import { searchNearest, getNearest } from '../actions';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text } from 'native-base';

class NearestPlace extends Component {

    onEndReached() {
        console.log("End reached");
        let { userLocation, karaokies, nearestPage } = this.props;
        let newPage = nearestPage + 1;
        this.props.getNearest(karaokies, userLocation, newPage);
    }

    render() {
        const { karaokies, loadingNearest, error } = this.props;

        if (loadingNearest) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) 
        } else if (karaokies.length == 0) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <Text>Không tìm thấy kết quả</Text>
                </View>
            );
        } else {
            return (
                <KaraokeList 
                karaokies={karaokies} 
                navigation={this.props.navigation}
                onEndReached={() => { this.onEndReached() }}/>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  });


const mapStateToProps = state => {
    //let nearestKaraokies = state.karaokeReducer.nearestKaraokies.map(karaoke => ({ key: karaoke.id, ...karaoke }));
    return {
        karaokies: state.karaokeReducer.nearestKaraokies,
        loadingNearest: state.karaokeReducer.loadingNearest,
        userLocation: state.karaokeReducer.userLocation,
        nearestPage: state.karaokeReducer.nearestPage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadData() {
            dispatch(searchNearest());
        },
        getNearest(nearestKaraokies, currentLocation, page) {
            dispatch(getNearest(nearestKaraokies, currentLocation, page));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NearestPlace);