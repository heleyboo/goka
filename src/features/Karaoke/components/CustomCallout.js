import React from 'react';
import PropTypes from 'prop-types';
import { Callout } from 'react-native-maps';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';

import { Text, Button, Col, Row, Grid, Thumbnail } from 'native-base';

const propTypes = {
    style: PropTypes.object,
};

class CustomCallout extends React.Component {

    getImageSource(karaoke) {
        if (karaoke.image_path) {
            return { uri: karaoke.image_path };
        } else {
            return { uri: 'https://hatinhnews.com.vn/uploads/noimage.png' };
        }
    }

    render() {
        let karaoke = this.props.karaoke;
        return (
            <Callout tooltip
                style={{
                    width: 350,
                }}>
                <Grid>
                    <Col size={30}>
                        <Image style={{
                            width: '100%',
                            height: '100%'
                          }} source={this.getImageSource(karaoke)} />
                    </Col>
                    <Col size={70} style={{ padding: 5, backgroundColor: '#FFFFFF' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{karaoke.name}</Text>
                        <Text>Giờ mở cửa: {karaoke.open} - {this.props.karaoke.close}</Text>
                        <Text>Cách bạn: {karaoke.distance}</Text>
                        <Row style={{ flex: 1 }}>
                            <Col size={50} style={{ padding: 5 }}>
                                <Button full rounded success style={{ height: 35 }}
                                    onPress={() => this.props.onDirectionButtonPressed()}>
                                    <Text>Chỉ đường</Text>
                                </Button>
                            </Col>
                            <Col size={50} style={{ padding: 5 }} >
                                <Button full rounded warning style={{ height: 35 }}
                                    onPress={() => this.props.onDetailButtonPressed()} >
                                    <Text>Chi tiết</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            </Callout>
        );
    }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        width: 250,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#4da2ab',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
    },
    amount: {
        flex: 1,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: -0.5,
    },
});

export default CustomCallout;
