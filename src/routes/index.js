import {
	createSwitchNavigator,
	createAppContainer
} from 'react-navigation';

import splash from '../components/splash';
import dashboardStack from './dashboard';

import Configs from '../configs';

const AppNavigation = createSwitchNavigator({
	splash: {
		screen: splash,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	dashboard: {
		screen: dashboardStack,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	}
},	{
		initialRouteName: 'splash',
		mode: 'card',
		headerMode: 'screen',
		// transitionConfig: Configs.horizontalTransitions,
		// cardStyle: {
		// 	opacity: 1
		// }
	}
);

export default createAppContainer(AppNavigation);
