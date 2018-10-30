//
// Description: This component will render list
// karaoke
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//

import React, { Component } from 'react';
import {
    Container,
    Thumbnail,
    Text,
    View,
    Grid,
    Col,
    Row
} from 'native-base';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, StyleSheet, Image } from 'react-native';


export default class KaraokeList extends Component {
    onKaraokeItemClicked(karaoke) {
        this.props.navigation.navigate('DetailKaraoke', {
            karaoke: karaoke
        });
    }

    onButtonDirectionClicked(karaoke) {
        var destination = karaoke.address;
        if (karaoke.lat && karaoke.lng) {
            destination = { "latitude": karaoke.lat, "longitude": karaoke.lng };
        }
        this.props.navigation.navigate('MapDirection', {
            destination: destination,
            karaokeName: karaoke.name
        });
    }

    getImageSource(karaoke) {
        if (karaoke.image_path) {
            return { uri: karaoke.image_path };
        } else {
            return { uri: 'https://hatinhnews.com.vn/uploads/noimage.png' };
        }
    }

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({item}) => (
        <View style={styles.container}>
            <Grid>
                <Row style={styles.rowItem} 
                onPress={() => this.onKaraokeItemClicked(item)}>
                    <Col style={styles.thumbnail}  size={20}>
                        <Thumbnail source={this.getImageSource(item)} />
                    </Col>
                    <Col style={styles.content} size={65}>
                        <Text style={styles.karaokeName}>{item.name}</Text>
                        <Text note>{item.distance}</Text>
                        <Text note>{item.address} - {item.phone}</Text>
                    </Col>
                    <Col style={styles.directionContainer} size={15}>
                        <FIcon name="directions" size={35} color={"#3174e0"} onPress={() => this.onButtonDirectionClicked(item)} />
                    </Col>
                </Row>
            </Grid>
        </View>
    );

    render() {
        const { karaokies } = this.props;
        return (
            <Container>
                <FlatList
                    data={karaokies}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onEndReached={() =>  this.props.onEndReached()}
                    onEndReachedThreshold={0.5}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 5,
    },
    thumbnail: {

    },
    directionContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowItem: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dee0e2',
    },
    karaokeName: {
        fontWeight: 'bold',
    },
    content: {
        marginBottom: 5
    }
});