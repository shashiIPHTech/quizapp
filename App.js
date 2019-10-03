import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './app/components/HomeScreen'
import Quiz from './app/components/QuizScreen'

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Quiz: {screen: Quiz},
});

const App = createAppContainer(MainNavigator);

export default App;