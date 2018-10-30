//
// Description: This component is for displaying search result
// Author: Hoan Do Van
// Author URL: https://thefullstackteam.com
//

import React, { Component } from 'react';
import { connect } from 'react-redux';


import KaraokeList from './KaraokeList';

class SearchResult extends Component {

    onEndReached() {}

    render() {
        const { karaokies } = this.props;
        return (
            <KaraokeList 
            karaokies={karaokies} 
            navigation={this.props.navigation}
            onEndReached={() => this.onEndReached()}/>
        );
    }
}

const mapStateToProps = state => {
    let karaokeList = state.karaokeReducer.karaokies.map(karaoke => ({key: karaoke.id, ...karaoke}));
    return {
        karaokies: karaokeList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);