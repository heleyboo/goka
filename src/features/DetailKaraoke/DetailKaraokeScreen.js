import React, { Component } from 'react';
import { Image } from 'react-native';
import {
    Container,
    Content, Text, Card, CardItem,
    Left, Thumbnail, Body, Button, View, Grid, Row, Col, Right, Icon
} from 'native-base';
import { detailKaraoke } from './actions';
import { connect } from 'react-redux';
import styles from './style';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import FIcon from 'react-native-vector-icons/FontAwesome5';

class DetailKaraoke extends Component {

    getImageSource(karaoke) {
        if (karaoke.image_path) {
            return { uri: karaoke.image_path };
        } else {
            return { uri: 'https://hatinhnews.com.vn/uploads/noimage.png' };
        }
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

    isDisabledCallButton(karaoke) {
        if (karaoke.phone) {
            return false;
        }
        return true;
    }

    onCallButtonPressed(karaoke) {
        if (karaoke.phone) {
            let phoneNumber = karaoke.phone.split(' ').join('');
            RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
        }
    }

    render() {
        let karaoke = this.props.navigation.state.params.karaoke;
        return (
            <Container style={styles.container}>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={this.getImageSource(karaoke)} />
                                <Body>
                                    <Text>{karaoke.name}</Text>
                                    <Text note>Đang mở cửa</Text>
                                    <Text style={styles.normalText}>{karaoke.open} - {karaoke.close}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={this.getImageSource(karaoke)} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <FIcon style={styles.icon} size={30} color='orange' active name="map-marker-alt" />
                            <Text>{karaoke.address}</Text>
                        </CardItem>
                        <CardItem>
                            <FIcon style={styles.icon} size={30} color='green' active name="map-marked" />
                            <Text>{karaoke.distance}</Text>
                        </CardItem>
                    </Card>
                    <View>
                        <Grid>
                            <Row style={[styles.border, styles.paddingTop]}>
                                <Col size={48}>
                                    <Button primary block rounded onPress={() => this.onDirectionButtonPressed(karaoke)}><Text> Chỉ đường </Text></Button>
                                </Col>
                                <Col size={4}></Col>
                                <Col size={48}>
                                    <Button success block rounded
                                        disabled={this.isDisabledCallButton(karaoke)}
                                        onPress={() => this.onCallButtonPressed(karaoke)}>
                                        <Text>Gọi cho quán</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        karaoke: state.detailKaraoke.karaoke
    };
};

const mapDispatchToProps = {
    detailKaraoke
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailKaraoke);