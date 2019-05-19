import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
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

    componentDidMount(): void {
        const { fetchListConnect } = this.props;
        fetchListConnect();
    };

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
                <FlatList
                    data={list}
                    renderItem={(item) => {
                        return this.renderImage(item);
                    }}/>
            </View>
        )
    }
}

export default connect(state => ({
    list: state.filmImage.result

}), {
    fetchListConnect: load
})(HallOfFame);
