import React, { Component } from 'react';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { getSongDetail } from '../actions';
import AppHeader from './AppHeader';
import VideoList from './VideoList';
import { WebView } from 'react-native';

class SongDetail extends Component {
    componentDidMount() {
        let songName = this.props.navigation.state.params.songName;
        this.props.getSongDetail(songName);
    }
    render() {
        const { songs } = this.props;
        var header = "KARAOKE " + this.props.navigation.state.params.songName;
        let searchQuery = this.props.navigation.state.params.songName + " karaoke";
        return (
            <WebView
            source={{uri: `https://www.youtube.com/results?search_query=${searchQuery}`}}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        songs: state.detailSongReducer.songs
    };
}
const mapDispatchToProps = dispatch => { 
    return {
        getSongDetail(songName) {
            dispatch(getSongDetail(songName));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);