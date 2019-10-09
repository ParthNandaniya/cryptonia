import {
    createStackNavigator,
	createAppContainer
} from 'react-navigation';

import dashboard from '../../components/dashboard';

const AppNavigation = createStackNavigator({
	dashboard: {
		screen: dashboard,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
},	{
		initialRouteName: 'dashboard',
		mode: 'card',
		headerMode: 'screen',
		// transitionConfig: Configs.horizontalTransitions,
		// cardStyle: {
		// 	opacity: 1
		// }
	}
);

export default createAppContainer(AppNavigation);
