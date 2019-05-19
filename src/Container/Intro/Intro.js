import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './IntroStyle';
import { skipIntro } from "../../Redux/Modules/auth";

const slides = [
    {
        key: 'somethun',
        title: 'Smarter hostels,\n' +
            'happier guests.',
        text: 'Tipi lets guests check-in, download their key & meet other guests staying at your hostel.\n' +
            '\n',
        backgroundColor: '#59b2ab',
    },
    {
        key: 'somethun-dos',
        title: 'WITH TIPI\n',
        text: 'We handle all the heavy lifting associated with check-in, so you can focus on what matters – the guest.',
        backgroundColor: '#febe29',
    },
    {
        key: 'somethun1',
        title: 'BEFORE TIPI\n',
        text: '20 minute queues after 20 hour flights, paperwork, key deposits, $$$ Key encoders, BAD communication',
        backgroundColor: '#22bcb5',
    }
];

class Intro extends React.Component {
    state = {
        showRealApp: false
    };

    static propTypes = {
        skipIntroConnect: PropTypes.func.isRequired,
    };

    _renderItem = (item) => {
        return (
            <View style={[styles.slide, { backgroundColor: item.backgroundColor}]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };

    _onDone = () => {
        const { skipIntroConnect } = this.props;
        skipIntroConnect();
    }
    render() {
        return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
    }
}

export default connect(state => ({

}), {
    skipIntroConnect: skipIntro
})(Intro);
