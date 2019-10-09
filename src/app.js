import React, { Component } from 'react';
import {
  BackAndroid,
  AsyncStorage, 
  View, 
  Text,
  StatusBar, 
  StyleSheet,
  YellowBox
} from 'react-native';
import { Root }from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import AppNavigation from './routes';
import reducers from './reducers';

class App extends Component {

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
    }

    render() {
        const store = createStore(
			persistReducer(
				(persistConfigs = {
					key: 'root',
                    storage
				}),
				reducers
			),
			{},
			compose(applyMiddleware(ReduxThunk))
        );

        return (
            <Provider store={store}>
				<Root>
                    <AppNavigation />
                </Root>
			</Provider>
        )
    }
}

export default App;
