import React, { Component } from 'react';
import { 
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { fetchSinglePrice } from '../actions';
import Configs from '../configs';

class Splash extends Component {

    componentDidMount() {
        const { fetchSinglePrice, navigation } = this.props;
        
        fetchSinglePrice({
            from: 'BTC',
            to: [ 'USD', 'EUR' ]
        }, () => {

            navigation.navigate('dashboard');
        }, error => {
            console.log(error);
        })
    }

    render() {
        const { containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <ActivityIndicator size="large" color={Configs.colors.loading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Configs.colors.splash
    }
})

export default connect(null, {
    fetchSinglePrice
})(Splash);
