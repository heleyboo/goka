//
// Description: This component is for displaying song list
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//
import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import {
    Content,
    Container,
    Body,
    List,
    ListItem,
    Left,
    Thumbnail,
    Text,
    Button,
    Header,
    Icon,
    Segment,
    Item,
    Input,
    Right,
} from 'native-base';
import {
    getSongList, updateFavorite
} from '../actions';
import { connect } from 'react-redux';
import commonTypes from '../../../constants/commonTypes';

let songImage = require('../../../resources/images/song1.png');
import FIcon from 'react-native-vector-icons/FontAwesome5';
class Bookmarks extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          buttonColor: "#9b9b9b",
          firstLoaded: true,
          selectedItems: []
        };
        this.props.navigation.addListener('didFocus', () => {
            if(!this.state.firstLoaded) {
                this.state.firstLoaded = true;
            }
            this.state.selectedItems = [];
            this.props.getSongList();
          });
      }
    componentDidMount() {
        this.props.getSongList();
    }
    componentWillUnmount() {
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
    renderItem = (song) => (
        <ListItem avatar key={song.id} 
            onPress={() => this.onSongItemClicked(song.name)}>
            <Left>
                <Thumbnail source={songImage} />
            </Left>
            <Body>
                <Text style={{ color: 'orange', fontSize: 17, fontWeight: 'bold' }}>{song.code}</Text>
                <Text>{song.name}</Text>
                <Text style={{color: "red", fontSize: 13}}>VOL {song.vol}</Text>
                <Text style={{color: "#ccc", fontSize: 12}}>Nhạc sĩ: {song.author}</Text>
                <Text note>{song.intro}</Text>
            </Body>
            <Right>
                <FIcon flex name="star" size={30} color={this.setColor(song.id, song.fav)} style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => this.onButtonFavoritedClicked(song.id)}/>
            </Right>
        </ListItem>
    );

    onPressButtonSearch() {
        Keyboard.dismiss();
    }
    onSongItemClicked(songName) {
        this.props.navigation.navigate('SongBookmarkDetail', {
            songName: songName
        });
    }
    render() {
        const { songs , songType, searchKeywork} = this.props;
        return (
            <Container>
                <Content>
                    <List>
                        {songs &&
                            songs.map(song => (
                                this.renderItem(song)
                            ))
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        songs: state.favSongReducer.songs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSongList() {
            dispatch(getSongList());
        },
        updateFavorite(id, isFav) {
            dispatch(updateFavorite(id, isFav));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);

