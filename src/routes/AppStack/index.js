import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import FIcon from 'react-native-vector-icons/FontAwesome5';
import DetailKaraoke from '../../features/DetailKaraoke/DetailKaraokeScreen';
import SongList from '../../features/Song/components/SongList';
import SearchPlaces from '../../features/Karaoke/components/SearchPlaces';
import SearchResult from '../../features/Karaoke/components/SearchResult';
import MapDirection from '../../features/Karaoke/components/MapDirection';
import SongDetail from '../../features/DetailSong/components/SongDetail';
import Bookmarks from '../../features/Bookmarks/components/Bookmarks';
import Account from '../../features/Account/components/Account';
import NearestPlace from '../../features/Karaoke/components/NearestPlaces';
import TopApp from '../../features/Account/components/TopApp';

const NearestStack = createStackNavigator({
    Nearest: {
        screen: NearestPlace,
        navigationOptions: (props) => ({
            title: "Quán Karaoke gần bạn",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    DetailKaraoke: {
        screen: DetailKaraoke,
        navigationOptions: (props) => ({
            title: "Thông tin chi tiết",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    MapDirection: {
        screen: MapDirection,
        navigationOptions: (props) => ({
            title: "Chỉ đường",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    }
}
    , {
        headerMode: 'float',
        mode: 'modal',
    });

const SearchPlaceStack = createStackNavigator({
    SearchPlaces: {
        screen: SearchPlaces,
        navigationOptions: (props) => ({
            title: "Tìm kiếm địa điểm karaoke",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    SearchResult: {
        screen: SearchResult,
        navigationOptions: (props) => ({
            title: "Kết quả tìm kiếm",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    DetailKaraoke: {
        screen: DetailKaraoke,
        navigationOptions: (props) => ({
            title: "Thông tin chi tiết",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    MapDirection: {
        screen: MapDirection,
        navigationOptions: (props) => ({
            title: "Chỉ đường",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    }
}
    , {
        headerMode: 'float'
    });

const SongStack = createStackNavigator({
    SongList: {
        screen: SongList,
        navigationOptions: (props) => ({
            title: "Danh sách bài hát",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    SongDetail: {
        screen: SongDetail,
        navigationOptions: (props) => ({
            title: "Youtube karaoke videos",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    }
}, {
    headerMode: 'float',
    mode: 'modal',
});
const BookmarksStack = createStackNavigator({
    Bookmarks: {
        screen: Bookmarks,
        navigationOptions: (props) => ({
            title: "Bài hát yêu thích",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    SongBookmarkDetail: {
        screen: SongDetail,
        navigationOptions: (props) => ({
            title: "Youtube karaoke videos",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    }
}, {
    headerMode: 'float',
    mode: 'modal',
});

const AccountStack = createStackNavigator({
    Account: {
        screen: Account,
        navigationOptions: (props) => ({
            title: "Tài khoản",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    },
    TopApp: {
        screen: TopApp,
        navigationOptions: (props) => ({
            title: "Tài khoản",
            headerStyle: {
                backgroundColor: '#115efb',
            },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
    }
}, {
    headerMode: 'float',
    mode: 'modal',
});

const AppStack = createBottomTabNavigator({
    Nearest: {
        screen: NearestStack,
        navigationOptions: {
            tabBarLabel: "Gần bạn",
            tabBarIcon: ({ focused, tintColor }) => (<FIcon name="map-marked" size={25} color={tintColor} />),
        }
    },
    Song: {
        screen: SongStack,
        navigationOptions: {
            tabBarLabel: "Bài hát",
            tabBarIcon: ({ focused, tintColor }) => (<FIcon name="music" size={25} color={tintColor} />)
        }
    },
    Home: {
        screen: SearchPlaceStack,
        navigationOptions: {
            tabBarLabel: "Goka",
            tabBarIcon: ({ focused, tintColor }) => (<FIcon name="microphone" size={25} color={tintColor} />)
        }
    },
    Bookmarks: {
        screen: BookmarksStack,
        navigationOptions: {
            tabBarLabel: "Yêu thích",
            tabBarIcon: ({ focused, tintColor }) => (<FIcon name="star" size={25} color={tintColor} />),
        }
    },
    Account: {
        screen: AccountStack,
        navigationOptions: {
            tabBarLabel: "Cài đặt",
            tabBarIcon: ({ focused, tintColor }) => (<FIcon name="cog" size={25} color={tintColor} />),
        }
    },

}, {
        initialRouteName: "Home",
        tabBarOptions: {
            activeTintColor: '#f4aa42',
            inactiveTintColor: '#9b9b9b',
            style: {
                backgroundColor: '#ffffff'
            }
        }
    });

export default AppStack;