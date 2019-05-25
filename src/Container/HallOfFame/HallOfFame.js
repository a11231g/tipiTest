/**
 * Hall of Fame container render a flat list that shows 5 photos and the third one is always sheldon cooper
 */

import React from 'react';
import {
    View,
    FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './HallOfFameStyle';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { load } from "../../Redux/Modules/filmImage";


class HallOfFame extends React.Component {

    static propTypes = {
        fetchListConnect: PropTypes.func.isRequired,
    };

    /**
     * fetch the new list in componentDidMount, if the array has been changed shows new images
     */

    componentDidMount(): void {
        const { fetchListConnect } = this.props;
        fetchListConnect();
    };

    /**
     * each item of flat list is shown by fastimage that can caches the images in both android and ios
     */
    renderImage = (item) => {

        return (
            <FastImage
                style={styles.image}
                source={{
                    uri: item.item,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}

            />
        );
    };

    render() {
        const { list } = this.props;
        return (
            <View style={styles.container}>
                {/* flat list */}
                <FlatList
                    data={list}
                    renderItem={(item) => {
                        return this.renderImage(item);
                    }}/>
            </View>
        )
    }
}

/**
 * Hall of Fame container render a flat list that shows 5 photos and the third one is always sheldon cooper
 */

export default connect(state => ({
    list: state.filmImage.result

}), {
    fetchListConnect: load
})(HallOfFame);
