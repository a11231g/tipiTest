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



export default class Welcome extends React.Component {
    state = {
        num: 0,
        inputNum: 1,
        Name: 10,
        animations: [
            'https://media.giphy.com/media/l0ExncehJzexFpRHq/giphy.gif',
            'https://media.giphy.com/media/26gsqQxPQXHBiBEUU/giphy.gif',
            'https://media.giphy.com/media/l0EwYkyU1JCExVquc/giphy.gif',
            'https://media.giphy.com/media/d1E1szXDsHUs3WvK/giphy.gif',
            'https://media.giphy.com/media/l0ExvMqtnw7aTzPCE/giphy.gif'

        ]
    };
    componentDidMount(): void {
        setInterval(()=>{
            const { num } = this.state;
            let newNum = num + 1;
            if(newNum === 5){
                newNum = 0
            }
            this.setState({num: newNum})
        }, 5000)
    }

    save = () => {
        const { inputNum, animations } = this.state;
        const oldArray = animations.slice(0);
        let newArray = shuffleSeed.shuffle(oldArray,inputNum);
        this.setState({ animations: newArray});
        Keyboard.dismiss();
    };

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
