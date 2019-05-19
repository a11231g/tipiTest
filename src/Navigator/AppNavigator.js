import React, { Component } from 'react';
import NavigationStack from './NavigationStack';
import { connect } from 'react-redux';
import  PropTypes  from 'prop-types';
import { startRehydrate } from '../Redux/Modules/rehydrate'
import NavigationService from '../Navigator/NavigationService'
import {  BackHandler, ActivityIndicator } from 'react-native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
let whoosh = new Sound('whoosh.m4a', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});


let gotoback = false;

class AppNavigator extends Component {

    componentDidMount() {
        this.props.startup();
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);


    }
    onBackPress = () => {
        if(gotoback){
            whoosh.play((success) => {
                if (!success) {
                    console.log('Sound did not play')
                }
            });
            return false;
        }
        gotoback = true;
        setTimeout(()=>{
            gotoback = false
        }, 500);
        const nav = NavigationService.returnNav();
        console.log(nav.state.nav.routes);
        if(nav.state.nav.routes[0].routeName === "Welcome" && !nav.state.nav.routes[1]){
            NavigationService.navigateAndReset('HallOfFame')
        }else{
            NavigationService.navigateAndReset('Welcome')
        }
        return true;
    };

    render() {
        return (
                <NavigationStack
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
        );
    }
}

AppNavigator.propTypes = {
    startup: PropTypes.func,
};

const mapStateToProps = (state) => ({});

export default connect(
    mapStateToProps,
    {
        startup: startRehydrate
    }
)(AppNavigator);

