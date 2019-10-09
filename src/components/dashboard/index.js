import React, { Component } from 'react';
import { 
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    Image
 } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Card, Item, Picker, Icon, Button, CardItem, Body, Left, Right, Spinner } from 'native-base';
import _ from 'lodash';
import { fetchSinglePrice } from '../../actions';
import cryptocurrencies from 'cryptocurrencies';
import Configs from '../../configs';

class Dashboard extends Component {
    state = {
        cryptoCurrency: 'BTC',
        isLoading: false
    }

    handleSearch = () => {
        const { fetchSinglePrice } = this.props;
        const { cryptoCurrency } = this.state;

        this.setState({ isLoading: true });

        fetchSinglePrice({
            from: cryptoCurrency,
            to: [ 'USD', 'EUR' ]
        }, () => {

            this.setState({ isLoading: false });
        }, error => {

            console.log(error);
            this.setState({ isLoading: false });
        })
    }

    componentDidMount() {
        
        // made request here and as successful, go to dashboard
        // console.log(this.props.crypto);
    }

    render() {
        const { containerStyle, headerContainerStyle, buttonContainer, buttonTextStyle, headerStyle, pickerStyle, buttonStyle, headerTextStyle, cardContainer, errorContainerStyle, errorMessageStyle } = styles;
        const { crypto: { singlePrice, singlePrice: { RAW, DISPLAY }, from, to } } = this.props;
        const { cryptoCurrency, isLoading } = this.state;

        return (
            <Container style={containerStyle}>
                <Header style={headerContainerStyle}><Text style={headerTextStyle}>Cryptonia</Text></Header>
                <Content>
                    <Item picker style={pickerStyle}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select Crypto Currency"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.cryptoCurrency}
                            onValueChange={value => this.setState({ cryptoCurrency: value })}
                        >
                            {
                                _.map(cryptocurrencies.symbols(), (item, index) => {
                                    return <Picker.Item key={item} label={`${item} - ${cryptocurrencies[item]}`} value={item} />
                                })
                            }
                        </Picker>
                    </Item>
                    <View style={buttonContainer}>
                        <Button style={buttonStyle} onPress={this.handleSearch}>
                            <Text style={buttonTextStyle}>Search Price</Text>
                        </Button>
                    </View>
                    <View style={cardContainer}>
                        {
                            isLoading ?
                                    <Spinner size="large" color={Configs.colors.loading} />
                            :
                            (typeof RAW !== 'undefined' && RAW.length !== 0) ?
                                    _.map(RAW[from], (value, key) => {

                                        return <Card>
                                            <CardItem header>
                                                <Text style={headerStyle}>1 {DISPLAY[from][key].FROMSYMBOL} {from} - {DISPLAY[from][key].TOSYMBOL} {key}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>PRICE: {RAW[from][key].PRICE}</Text>
                                                    <Text>VOLUME24HOUR: {RAW[from][key].VOLUME24HOUR}</Text>
                                                    <Text>LOW24HOUR: {RAW[from][key].LOW24HOUR}</Text>
                                                    <Text>HIGH24HOUR: {RAW[from][key].HIGH24HOUR}</Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    })
                            :   <View style={errorContainerStyle}>
                                    <Text style={errorMessageStyle}>{singlePrice.Message}</Text>
                            </View>
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        // justifyContent: 'center',
		// alignItems: 'center',
		// backgroundColor: Configs.colors.dashboard
    },
    headerContainerStyle: {
        backgroundColor: Configs.colors.black
    },
    headerStyle: {
        fontSize: 18,
        fontWeight: '600'
    },
    headerTextStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 26,
        color: 'white',
        fontWeight: '700'
    },
    buttonContainer: {
        flex: 1,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: 150,
        backgroundColor: Configs.colors.button,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    },
    pickerStyle: {
        marginTop: 20,
        marginBottom: 10,
    },
    cardContainer: {
        marginTop: 20,
    },
    errorContainerStyle: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'

    },
    errorMessageStyle: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center'
    }
})


const mapStateToProps = ({ crypto }) => {

    return ({
        crypto
    });
}

export default connect(mapStateToProps, {
    fetchSinglePrice
})(Dashboard);
// {/* Object.keys(RAW[from]).forEach(function(key) { */}