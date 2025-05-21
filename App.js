import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './app/screens/LoginScreen';
import SignupScreen from './app/screens/SignupScreen';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Signup" component={SignupScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;