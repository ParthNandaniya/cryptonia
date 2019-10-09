/**
 * @format
 */

import { AppRegistry } from 'react-native';
import {name as appName} from './app.json';

import App from './src/app';

AppRegistry.registerComponent(appName, () => {
	console.disableYellowBox = true;
	console.error = error => error.apply;

	return App;
});

