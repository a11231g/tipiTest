import React from 'react';
import {
    View,
    TextInput,
    Button,
    Keyboard
} from 'react-native';
import styles from './WelcomeStyle';
import FastImage from 'react-native-fast-image'
import shuffleSeed from 'shuffle-seed';

let interval = null;

export default class Welcome extends React.Component {

    /**
     * animations: array of animation images to show
     * inputNum: the  value of textinput so user can change it to shuffle the array of animation image
     * num: the number of active index of image array
     */

    state = {
        num: 0,
        inputNum: '1',
        animations: [
            'https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.gif',
            'https://media.giphy.com/media/26gsqQxPQXHBiBEUU/giphy.gif',
            'https://media.giphy.com/media/l0EwYkyU1JCExVquc/giphy.gif',
            'https://media.giphy.com/media/d1E1szXDsHUs3WvK/giphy.gif',
            'https://media.giphy.com/media/l0ExvMqtnw7aTzPCE/giphy.gif'

        ]
    };

    /**
     * when componentDidMount in every 5 seconds go to the next index of animation image array to render
     */
    componentDidMount(): void {
        interval = setInterval(()=>{
            const { num } = this.state;
            let newNum = num + 1;
            if(newNum === 5){
                newNum = 0
            }
            this.setState({num: newNum})
        }, 5000)
    };

    /**
     * when componentWillUnmount clears interval
     */

    componentWillUnmount(): void {
        clearInterval(interval);
    }

    /**
     * on press go on textinput or pressing save button , number in textinput will be used to shuffle the image array
     */

    save = () => {
        const { inputNum, animations } = this.state;
        const oldArray = animations.slice(0);
        let newArray = shuffleSeed.shuffle(oldArray,parseInt(inputNum, 10));
        this.setState({ animations: newArray});
        Keyboard.dismiss();
    };

    /**
     * randomise button will make new shuffle out of animation image array by a random number ranged from 0-9
     */

    randomise = () => {
        const { animations } = this.state;
        const oldArray = animations.slice(0);
        const randomnumber = Math.floor(Math.random() * (9)) + 1;
        let newArray = shuffleSeed.shuffle(oldArray,randomnumber);
        this.setState({inputNum :randomnumber.toString(), animations: newArray});
        Keyboard.dismiss();
    };

    gotoHallOfFame = () => {
        this.props.navigation.navigate('HallOfFame')
    };

    render() {
        const { num, inputNum, animations } = this.state;
        return(
            <View style={styles.container}>
                <View>
                    <Button
                        title={'Go to Hall of fame'}
                        onPress={this.gotoHallOfFame}
                    />
                </View>
                <View>
                    <TextInput
                        style={[styles.input, styles.marginBottom]}
                        defaultValue={'1'}
                        placeholder="enter a number"
                        value={inputNum}
                        onChangeText={inputNum => this.setState({ inputNum })}
                        returnKeyType={'go'}
                        keyboardType={'number-pad'}
                        onSubmitEditing={() => {
                            this.save();
                            Keyboard.dismiss()
                        }}
                    />
                    <Button
                        title={'Save'}
                        style={styles.marginBottom}
                        onPress={this.save}
                    />
                    <Button
                        style={styles.marginBottom}
                        title={'Randomise'}
                        onPress={this.randomise}
                    />

                </View>

                <FastImage
                    style={styles.image}
                    source={{
                        uri: animations[num],
                        priority: FastImage.priority.normal,
                    }}
                />
            </View>
        )
    }
}
