import React, { Component } from 'react';
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';

export default class Account extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="thumbs-up" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Ứng dụng hay</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="star" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Đánh giá ứng dụng</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="share" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Chia sẻ</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="share" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Email góp ý</Text>
                        </Body>
                        <Right>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}