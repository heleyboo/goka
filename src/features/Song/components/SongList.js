//
// Description: This component is for displaying song list
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//
import React, { Component } from 'react';
import { Keyboard, StyleSheet, FlatList, View } from 'react-native';
import {
    Container,
    Grid,
    Col,
    Row,
    Text
} from 'native-base';
import { SearchBar } from 'react-native-elements';
import {
    getSongList, updateFavorite
} from '../actions';
import { connect } from 'react-redux';
import commonTypes from '../../../constants/commonTypes';

import FIcon from 'react-native-vector-icons/FontAwesome5';
class SongList extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          buttonColor: "#9b9b9b",
          firstLoaded: true,
          selectedItems: []
        };
      }
    componentDidMount() {
        this.props.getSongList([], commonTypes.KARA_TYPE_5, "", 1);
    }

    onButtonFavoritedClicked(id) {
        this.setState({firstLoaded: false});
        const forDeletion = [id]; //can also be used for multiple ids
        var selectedItemsTemp = this.state.selectedItems;
        var isFav = 0;
        if (selectedItemsTemp.includes(id)) {
            //if id already exists delete it
            selectedItemsTemp = selectedItemsTemp.filter(item => !forDeletion.includes(item));
        } else {
            //otherwise push it
            selectedItemsTemp.push(id);
            isFav = 1;
        }
        //Update DB
        this.props.updateFavorite(id, isFav);
        this.setState({ selectedItems: selectedItemsTemp });
    }
    setColor(id, isFav) {
        if (this.state.selectedItems.includes(id) || (this.state.firstLoaded && isFav === "1")) {
            this.state.selectedItems.push(id);
            return "#f4aa42";
        } 
        return "#9b9b9b";
    }

    onChangeKeywork(searchKeywork) {
        const { songType } = this.props;
        this.props.getSongList([], songType, searchKeywork, 1);
    }

    onChangeSongType(songType) {
        const { searchKeywork } = this.props;
        this.props.getSongList([], songType, searchKeywork, 1);
    }

    onPressButtonSearch() {
        Keyboard.dismiss();
        const { songType, searchKeywork } = this.props;
        this.props.getSongList([], songType, searchKeywork, 1);
    }
    onSongItemClicked(songName) {
        this.props.navigation.navigate('SongDetail', {
            songName: songName
        });
    }

    onEndReached() {
        const { songs, page, songType, searchKeywork } = this.props;
        let newPage = page + 1;
        this.props.getSongList(songs, songType, searchKeywork, newPage);
    }

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({item}) => (
        <View style={styles.container}>
            <Grid>
                <Row style={styles.rowItem} onPress={() => this.onSongItemClicked(item.name)}>
                    <Col style={styles.codeItem} size={25}>
                        <Text style={styles.code}>{item.code}</Text>
                        <FIcon 
                        flex name="star"
                        size={40}
                        color={this.setColor(item.id, item.fav)}
                        style={styles.icon}
                        onPress={() => this.onButtonFavoritedClicked(item.id)}/>
                        <Text>VOL {item.vol}</Text>
                    </Col>
                    <Col style={styles.content} size={75}>
                        <Text style={styles.karaokeName}>{item.name}</Text>
                        <Text note>Tác giả: {item.author}</Text>
                        <Text note>{item.intro}</Text>
                    </Col>
                </Row>
            </Grid>
        </View>
    );

    render() {
        const { songs } = this.props;
        return (
            <Container>
                <SearchBar
                    round
                    lightTheme 
                    searchIcon={{ size: 24 }}
                    onChangeText={(searchKeywork) => this.onChangeKeywork(searchKeywork)}
                    placeholder='Nhập từ khoá cần tìm..' />

                <FlatList
                    data={songs}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onEndReached={() =>  this.onEndReached()}
                    onEndReachedThreshold={0.1}

                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        borderWidth: 0.5,
        borderColor: '#dee0e2',
        borderRadius: 5,
    },
    rowItem: {
        padding: 3,
    },
    code: {
        fontWeight: 'bold',
        color: 'orange'
    },
    codeItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        margin: 5,
    }

});

const mapStateToProps = state => {
    return {
        songs: state.songReducer.songs,
        songType: state.songReducer.songType,
        searchKeywork: state.songReducer.searchKeywork,
        page: state.songReducer.page
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSongList(songs, songType, searchKeywork, page) {
            dispatch(getSongList(songs, songType, searchKeywork, page));
        },
        updateFavorite(id, isFav) {
            dispatch(updateFavorite(id, isFav));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SongList);

