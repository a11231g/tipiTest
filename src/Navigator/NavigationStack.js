import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {
    Intro,
    Welcome,
    HallOfFame,
} from '../Container';

/**
 * app navigator: StackNavigator with 3 screens
 *
 */

const NavigationStack = createStackNavigator({
    Intro: {
        screen: Intro,
        navigationOptions: () => ({header: null})
    },

    Welcome: {
        screen: Welcome,
        navigationOptions: () => ({header: null})

    },
    HallOfFame: {
        screen: HallOfFame,
        navigationOptions: () => ({header: null})

    },
}, {initialRouteName: "Intro", gesturesEnabled: true,});
export default createAppContainer(NavigationStack);
